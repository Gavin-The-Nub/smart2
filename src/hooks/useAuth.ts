import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase";

export type UserRole = "admin" | "ops_admin" | "tutor" | "student";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  role?: UserRole;
  available_credits?: number;
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        return;
      }

      setProfile(data as UserProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = "student"
  ) => {
    try {
      setLoading(true);

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // Create profile in profiles table
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: authData.user.id,
          full_name: fullName,
          email: email,
          role: role,
          available_credits: role === "student" ? 0 : undefined,
        });

        if (profileError) {
          console.error("Error creating profile:", profileError);
          // Don't throw here as the user is already created in auth
        }

        toast({
          title: "Account Created",
          description:
            "Welcome! Your account has been created successfully. Please check your email to verify your account.",
        });

        return { error: null };
      }

      return { error: new Error("Failed to create account") };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast({
        title: "Sign Up Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error(message) };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        await fetchProfile(data.user.id);
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
        return { error: null };
      }

      return { error: new Error("Failed to sign in") };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      toast({
        title: "Sign In Error",
        description: message,
        variant: "destructive",
      });
      return { error: new Error(message) };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      setSession(null);
      setProfile(null);

      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: "There was an error signing out.",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };
}

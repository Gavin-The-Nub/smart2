import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, BookOpen, Save, CheckCircle } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  description?: string;
}

interface TutorProfile {
  bio?: string;
  phone?: string;
  selectedSubjects: string[];
}

export default function TutorProfileSetup() {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tutorProfile, setTutorProfile] = useState<TutorProfile>({
    bio: "",
    phone: "",
    selectedSubjects: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile?.role === "tutor") {
      fetchSubjects();
      fetchTutorProfile();
    }
  }, [profile?.role]);

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching subjects:", error);
        return;
      }

      setSubjects(data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchTutorProfile = async () => {
    if (!profile?.id) return;

    try {
      // Fetch tutor's selected subjects
      const { data: tutorSubjects, error: subjectsError } = await supabase
        .from("tutor_subjects")
        .select("subject_id")
        .eq("tutor_id", profile.id);

      if (subjectsError) {
        console.error("Error fetching tutor subjects:", subjectsError);
      }

      setTutorProfile((prev) => ({
        ...prev,
        bio: profile.bio || "",
        phone: profile.phone || "",
        selectedSubjects: tutorSubjects?.map((ts) => ts.subject_id) || [],
      }));
    } catch (error) {
      console.error("Error fetching tutor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectToggle = (subjectId: string) => {
    setTutorProfile((prev) => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subjectId)
        ? prev.selectedSubjects.filter((id) => id !== subjectId)
        : [...prev.selectedSubjects, subjectId],
    }));
  };

  const handleSave = async () => {
    if (!profile?.id || !user) {
      toast({
        title: "Error",
        description: "You must be logged in to save your profile.",
        variant: "destructive",
      });
      return;
    }

    if (tutorProfile.selectedSubjects.length === 0) {
      toast({
        title: "Missing Subjects",
        description: "Please select at least one subject you can teach.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      // Update profile with bio and phone
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          bio: tutorProfile.bio,
          phone: tutorProfile.phone,
        })
        .eq("user_id", user.id);

      if (profileError) {
        throw profileError;
      }

      // Update tutor subjects
      // First, delete existing subjects
      const { error: deleteError } = await supabase
        .from("tutor_subjects")
        .delete()
        .eq("tutor_id", profile.id);

      if (deleteError) {
        console.error("Error deleting existing subjects:", deleteError);
      }

      // Then insert new subjects
      if (tutorProfile.selectedSubjects.length > 0) {
        const tutorSubjects = tutorProfile.selectedSubjects.map(
          (subjectId) => ({
            tutor_id: profile.id,
            subject_id: subjectId,
          })
        );

        const { error: insertError } = await supabase
          .from("tutor_subjects")
          .insert(tutorSubjects);

        if (insertError) {
          throw insertError;
        }
      }

      toast({
        title: "Profile Updated",
        description: "Your tutor profile has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Save Failed",
        description:
          "There was an error saving your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (profile?.role !== "tutor") {
    return null;
  }

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Tutor Profile Setup
        </CardTitle>
        <CardDescription>
          Complete your profile to start receiving booking requests from
          students.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell students about your teaching experience, qualifications, and approach..."
              value={tutorProfile.bio}
              onChange={(e) =>
                setTutorProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={tutorProfile.phone}
              onChange={(e) =>
                setTutorProfile((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Subject Selection */}
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">
              Subjects You Can Teach
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select all subjects you're qualified to teach. Students will be
              able to find you based on these subjects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={subject.id}
                  checked={tutorProfile.selectedSubjects.includes(subject.id)}
                  onCheckedChange={() => handleSubjectToggle(subject.id)}
                />
                <div className="flex-1 min-w-0">
                  <Label
                    htmlFor={subject.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {subject.name}
                  </Label>
                  {subject.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {subject.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {tutorProfile.selectedSubjects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No subjects selected</p>
              <p className="text-sm">
                Please select at least one subject to continue
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving || tutorProfile.selectedSubjects.length === 0}
            size="lg"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Status */}
        {tutorProfile.selectedSubjects.length > 0 && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Profile Ready
              </p>
              <p className="text-xs text-green-600">
                You can now set your availability and start receiving booking
                requests.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}





import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";

interface RoleGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  allow?: UserRole[];
}

export function RoleGuard({
  children,
  requireAuth = true,
  allow,
}: RoleGuardProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allow && allow.length > 0) {
    const role = profile?.role;
    // Only enforce restriction when we actually know the role
    if (role && !allow.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Tutor = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
};

interface TutorSelectorProps {
  onTutorSelect: (tutor: Tutor) => void;
  selectedTutor?: Tutor | null;
}

export const TutorSelector: React.FC<TutorSelectorProps> = ({
  onTutorSelect,
  selectedTutor,
}) => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTutors = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate loading tutors
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockTutors: Tutor[] = [
        {
          id: "tutor-1",
          user_id: "user-1",
          full_name: "Dr. Sarah Johnson",
          email: "sarah@example.com",
          bio: "Mathematics professor with 10+ years of experience",
          avatar_url: undefined,
        },
        {
          id: "tutor-2",
          user_id: "user-2",
          full_name: "Prof. Michael Chen",
          email: "michael@example.com",
          bio: "Physics expert specializing in quantum mechanics",
          avatar_url: undefined,
        },
        {
          id: "tutor-3",
          user_id: "user-3",
          full_name: "Dr. Emily Rodriguez",
          email: "emily@example.com",
          bio: "Chemistry tutor with focus on organic chemistry",
          avatar_url: undefined,
        },
      ];

      setTutors(mockTutors);
    } catch (err) {
      console.error("Tutor loading error:", err);
      setError(err instanceof Error ? err.message : "Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  // Load tutors on component mount
  React.useEffect(() => {
    loadTutors();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-600 mt-2">Loading tutors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={loadTutors}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Select a Tutor</h3>
        <button
          onClick={loadTutors}
          disabled={loading}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedTutor?.id === tutor.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onTutorSelect(tutor)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {tutor.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{tutor.full_name}</h4>
                <p className="text-sm text-gray-600">{tutor.email}</p>
                {tutor.bio && (
                  <p className="text-sm text-gray-500 mt-1">{tutor.bio}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {tutors.length === 0 && !loading && !error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            No Tutors Available
          </h4>
          <p className="text-sm text-blue-700">
            Demo tutors are loaded automatically. Click refresh if you don't see
            any.
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorSelector;

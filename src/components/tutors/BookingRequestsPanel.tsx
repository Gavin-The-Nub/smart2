import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type BookingRequest = {
  id: string;
  student_id: string;
  requested_date: string; // YYYY-MM-DD
  requested_time: string; // HH:MM:SS
  duration_minutes: number;
  status: string;
  notes: string | null;
  student_profile: {
    full_name: string;
    email: string;
  };
};

export const BookingRequestsPanel: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [meetingLinks, setMeetingLinks] = useState<Record<string, string>>({});

  const accept = async (id: string) => {
    const link = meetingLinks[id];
    if (!link) {
      setError("Please enter a meeting link.");
      return;
    }
    setLoading(true);
    setError(null);

    // Simulate accepting request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
    );
    setLoading(false);
  };

  const decline = async (id: string) => {
    setLoading(true);
    setError(null);

    // Simulate declining request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "declined" } : req))
    );
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="text-base font-semibold text-gray-900">
          Pending Booking Requests
        </h4>
        <p className="text-sm text-gray-600">
          Review requests and attach a meeting link when accepting.
        </p>
        <button
          onClick={() => {
            // Add a mock request for demo
            const mockRequest: BookingRequest = {
              id: `mock-${Date.now()}`,
              student_id: "student-123",
              requested_date: "2024-01-15",
              requested_time: "14:00:00",
              duration_minutes: 60,
              status: "pending",
              notes: "Need help with calculus",
              student_profile: {
                full_name: "John Doe",
                email: "john@example.com",
              },
            };
            setRequests((prev) => [mockRequest, ...prev]);
          }}
          className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Demo Request
        </button>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 text-sm rounded">
          {error}
        </div>
      )}
      {loading && <div className="mb-4 text-sm text-gray-600">Loading...</div>}
      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="text-sm text-gray-500">
            No booking requests. Click "Add Demo Request" to see how it works.
          </div>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="border rounded-md p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-sm text-gray-900 font-medium">
                    {r.student_profile?.full_name || "Unknown Student"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {new Date(
                      `${r.requested_date}T${r.requested_time}`
                    ).toLocaleString()}{" "}
                    · {r.duration_minutes} min
                  </div>
                  <div className="text-xs text-gray-600">
                    Status: {r.status}
                  </div>
                  {r.notes && (
                    <div className="text-xs text-gray-600">
                      Notes: {r.notes}
                    </div>
                  )}
                </div>
                {r.status === "pending" ? (
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <input
                      type="url"
                      placeholder="Meeting link (Zoom/Meet)"
                      className="px-3 py-2 border rounded-md w-full sm:w-64"
                      value={meetingLinks[r.id] || ""}
                      onChange={(e) =>
                        setMeetingLinks((m) => ({
                          ...m,
                          [r.id]: e.target.value,
                        }))
                      }
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => accept(r.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => decline(r.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">
                    No actions available
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingRequestsPanel;

import React, { useState, useMemo, useEffect } from "react";

import { Reveal } from "../components/animations/Reveal";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "name", label: "Name A→Z" },
  { value: "newest", label: "Newest" },
];

type Tutor = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
};

// Mock FiltersBar component
const FiltersBar = ({ filters, onChange, onMoreFilters }: any) => (
  <div className="mb-4 flex flex-col sm:flex-row gap-2 items-center">
    <input
      type="text"
      placeholder="Search tutors..."
      value={filters.search}
      onChange={(e) => onChange("search", e.target.value)}
      className="border rounded-lg px-3 py-2 text-base"
    />
    <button
      type="button"
      className="ml-2 px-3 py-2 text-base bg-blue-600 text-white rounded-lg"
      onClick={onMoreFilters}
    >
      More Filters
    </button>
  </div>
);

// Mock TutorCard component
const TutorCard = ({ tutor }: any) => (
  <div className="rounded-lg border px-6 py-4 flex gap-6 bg-white shadow-sm">
    <div className="w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full">
      <span className="text-xl font-bold text-blue-600">
        {tutor.full_name
          .split(" ")
          .map((n: any) => n[0])
          .join("")}
      </span>
    </div>
    <div className="flex-1">
      <div className="font-bold text-lg">{tutor.full_name}</div>
      <div className="text-sm text-gray-600">{tutor.email}</div>
      <div className="text-gray-700 mt-1">{tutor.bio}</div>
    </div>
  </div>
);

export default function FindTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    sort: "popularity",
  });

  // Load tutors from mock data
  useEffect(() => {
    const loadTutors = async () => {
      try {
        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockTutors: Tutor[] = [
          {
            id: "tutor-1",
            user_id: "user-1",
            full_name: "Dr. Sarah Johnson",
            email: "sarah@example.com",
            bio: "Mathematics professor with 10+ years of experience teaching calculus, algebra, and statistics.",
            avatar_url: undefined,
          },
          {
            id: "tutor-2",
            user_id: "user-2",
            full_name: "Prof. Michael Chen",
            email: "michael@example.com",
            bio: "Physics expert specializing in quantum mechanics, thermodynamics, and classical mechanics.",
            avatar_url: undefined,
          },
          {
            id: "tutor-3",
            user_id: "user-3",
            full_name: "Dr. Emily Rodriguez",
            email: "emily@example.com",
            bio: "Chemistry tutor with focus on organic chemistry, biochemistry, and analytical chemistry.",
            avatar_url: undefined,
          },
          {
            id: "tutor-4",
            user_id: "user-4",
            full_name: "Prof. David Kim",
            email: "david@example.com",
            bio: "Computer Science instructor specializing in programming, algorithms, and data structures.",
            avatar_url: undefined,
          },
          {
            id: "tutor-5",
            user_id: "user-5",
            full_name: "Dr. Lisa Thompson",
            email: "lisa@example.com",
            bio: "Biology professor with expertise in molecular biology, genetics, and cell biology.",
            avatar_url: undefined,
          },
        ];

        setTutors(mockTutors);
      } catch (err) {
        console.error("Error loading tutors:", err);
        setError(err instanceof Error ? err.message : "Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };

    loadTutors();
  }, []);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  // Filtering logic
  const filteredTutors = useMemo(() => {
    let t = [...tutors];
    if (filters.search) {
      t = t.filter(
        (tutor) =>
          tutor.full_name
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          (tutor.bio &&
            tutor.bio.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }
    // Sorting
    if (filters.sort === "name")
      t.sort((a, b) => a.full_name.localeCompare(b.full_name));
    else if (filters.sort === "newest") t = t.slice().reverse();
    // Popularity is default (no-op)
    return t;
  }, [tutors, filters]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Loading tutors...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center py-8">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fadein">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
          Find Tutors
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mb-6 line-clamp-2">
          Browse and book the best teachers for your needs.
        </p>
        <FiltersBar
          filters={filters}
          onChange={handleFilterChange}
          onMoreFilters={() => {}}
        />
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <label className="flex items-center gap-2 text-base">
            <span>Sort:</span>
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
                aria-controls="tutors-results"
                className="appearance-none rounded-lg border border-slate-200 bg-white shadow-sm px-3 pr-8 py-2 text-base focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </label>
        </div>
        <div id="tutors-results" className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Found {filteredTutors.length} teachers for you
          </h2>
          <div className="flex flex-col space-y-8">
            {filteredTutors.map((tutor, idx) => (
              <Reveal key={tutor.id} delay={idx * 80}>
                <TutorCard tutor={tutor} />
              </Reveal>
            ))}
          </div>
          {filteredTutors.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No tutors found. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

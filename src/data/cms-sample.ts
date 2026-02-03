import { LucideIcon } from "lucide-react";

// --- Interfaces ---

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  label: string;
  items: FAQItem[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  location?: string;
  content: string;
  rating: number; // 1-5
  avatarUrl?: string;
  date: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Intended to be mapped to Lucide icons or similar in the UI
}

// --- Sample Data ---

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "wcu-1",
    title: "Enroll One, Empower Two",
    description: "Our unique social impact model means that for every paid session you book, we provide a free tutoring session to an underserved student. Your learning directly contributes to a more equitable world.",
    iconName: "HeartHandshake",
  },
  {
    id: "wcu-2",
    title: "Expert, Vetted Tutors",
    description: "We carefully select providing educators who are not just subject matter experts, but compassionate mentors committed to personalized growth for every student.",
    iconName: "GraduationCap",
  },
  {
    id: "wcu-3",
    title: "Personalized Learning Plans",
    description: "No two brains are alike. We reject cookie-cutter approaches in favor of tailored strategies that respect your child's unique learning style, pace, and goals.",
    iconName: "BrainCircuit",
  },
  {
    id: "wcu-4",
    title: "Flexible & Convenient",
    description: "Book sessions that fit your busy schedule. Our online platform allows for easy scheduling, rescheduling, and learning from the comfort of your home.",
    iconName: "CalendarClock",
  },
];

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    name: "Sarah M.",
    role: "Parent",
    location: "California, USA",
    content: "My son was struggling with Algebra, but after just a month with his Smart Brain tutor, his confidence has soared. Knowing that our fees also help another child makes it even more rewarding.",
    rating: 5,
    date: "2023-10-15",
    avatarUrl: "/assets/avatars/sarah.jpg",
  },
  {
    id: "rev-2",
    name: "David K.",
    role: "Student",
    location: "London, UK",
    content: "I used to hate writing essays, but my tutor made it fun and easy to understand. I finally feel ready for my exams!",
    rating: 5,
    date: "2023-11-02",
    avatarUrl: "/assets/avatars/david.jpg",
  },
  {
    id: "rev-3",
    name: "Dr. Emily R.",
    role: "Education Partner",
    content: "Smart Brain TLC is a game-changer. Their commitment to equity and excellence is exactly what the education sector needs right now. Highly recommended.",
    rating: 5,
    date: "2023-09-20",
    avatarUrl: "/assets/avatars/emily.jpg",
  },
  {
    id: "rev-4",
    name: "Michael T.",
    role: "Parent",
    location: "Toronto, Canada",
    content: "Reliable, professional, and truly caring. The 'Enroll One, Empower Two' mission is what drew us in, but the quality of teaching is what keeps us here.",
    rating: 4,
    date: "2023-12-05",
    avatarUrl: "/assets/avatars/michael.jpg",
  },
];

export const faqData: FAQCategory[] = [
  {
    label: "Parents",
    items: [
      {
        question: "How do credits work?",
        answer: "1 credit = 30 minutes. Credits can be used for 30 or 60 minute sessions. You can reschedule ≥24 hours before a session for a credit refund."
      },
      {
        question: "What session lengths do you support?",
        answer: "30 or 60 minutes (with flexible options like 45/90 if needed)."
      },
      {
        question: "Do credits expire?",
        answer: "Credits expire after 2 months to encourage consistent learning habits."
      },
      {
        question: "How are reminders handled?",
        answer: "Email/SMS reminders are sent 24 hours and 1 hour before sessions to ensure you never miss a class."
      }
    ]
  },
  {
    label: "Sponsors",
    items: [
      {
        question: "How does sponsorship work?",
        answer: "A portion of paid enrollments funds our sponsorship pool. Sponsors can send a moderated welcome message at checkout and receive anonymized updates."
      },
      {
        question: "Will the sponsored student's photo be public?",
        answer: "Only with explicit parental consent; otherwise we share anonymized photos, work samples, or tutor summaries."
      },
      {
        question: "Can I contact a student directly?",
        answer: "Direct contact isn't allowed for safety reasons. Communication happens through moderated letters and platform updates."
      }
    ]
  },
  {
    label: "Tutors",
    items: [
      {
        question: "What happens if a student no-shows?",
        answer: "Credits are deducted if a student misses without notice; if a tutor cancels, credits are fully refunded to the student."
      },
      {
        question: "Maximum daily sessions?",
        answer: "Students can book multiple sessions per day, though we have platform safeguards to ensure quality and avoid tutor burnout."
      }
    ]
  },
  {
    label: "Partners",
    items: [
      {
        question: "What reporting do partners receive?",
        answer: "Impact metrics such as total credits received/used, sessions completed, and progress summaries are provided regularly."
      }
    ]
  },
  {
    label: "Schools",
    items: [
      {
        question: "How do school credits and assignments work?",
        answer: "Sponsors can assign credits to a school; principals receive credits, assign them to students, and track usage via dashboards with reporting."
      }
    ]
  }
];
// ... existing exports

export interface CoreValue {
  id: string;
  value: string;
  description: string;
  icon: string; // Emoji
  displayOrder: number;
}

export const coreValuesData: CoreValue[] = [
  {
    id: "val-1",
    value: "Empowerment",
    description: "Enabling students to reach their full potential",
    icon: "💪",
    displayOrder: 1
  },
  {
    id: "val-2",
    value: "Equity",
    description: "Ensuring fair access to quality education",
    icon: "⚖️",
    displayOrder: 2
  },
  {
    id: "val-3",
    value: "Integrity",
    description: "Honest and transparent in all our interactions",
    icon: "🤝",
    displayOrder: 3
  },
  {
    id: "val-4",
    value: "Innovation",
    description: "Continuously improving our teaching methods",
    icon: "💡",
    displayOrder: 4
  },
  {
    id: "val-5",
    value: "Community",
    description: "Building connections that last beyond tutoring",
    icon: "🌍",
    displayOrder: 5
  }
];

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Target,
  Clock,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/animations/Reveal";
import { Stagger } from "../components/animations/Stagger";
import { useMetaTags } from "../hooks/useMetaTags";
import { supabase } from "../lib/supabase";

type ServiceRecord = {
  id: number;
  icon: string;
  title: string;
  description: string | null;
  features: string[] | null;
  sort_order: number;
  is_active: boolean;
};

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Users,
  Target,
  Clock,
  Brain,
};

export default function Services() {
  useMetaTags({
    title: "Our Services - Smart Brain TLC",
    description:
      "We provide personalized, high-quality tutoring for K–12 students and beyond. Sessions are flexible, engaging, and designed to boost confidence and performance.",
    url: "https://smartbrainlearning.org/services",
  });

  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("landing_services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching services", error);
        setError("Unable to load services right now. Please try again later.");
      } else if (data) {
        setServices(data);
      }

      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url('/vendor/monst/img/backgrounds/intersect.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center">
              <Reveal>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Our <span className="text-blue-600">Services</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  We provide personalized, high-quality tutoring for K–12
                  students and beyond. Sessions are flexible, engaging, and
                  designed to boost confidence and performance.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            {loading && (
              <div className="text-center text-gray-500">
                Loading services...
              </div>
            )}

            {!loading && error && (
              <div className="text-center text-red-500">{error}</div>
            )}

            {!loading && !error && services.length === 0 && (
              <div className="text-center text-gray-500">
                No services are available right now. Please check back later.
              </div>
            )}

            {!loading && !error && services.length > 0 && (
              <Stagger
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                baseDelay={100}
                step={100}
              >
                {services.map((service) => {
                  const IconComponent = iconMap[service.icon] ?? BookOpen;

                  return (
                    <div key={service.id} className="group">
                      <div className="h-full bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                          <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {service.title}
                        </h3>
                        {service.description && (
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {service.description}
                          </p>
                        )}

                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-sm text-gray-500"
                              >
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Stagger>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have improved their academic
                performance with our expert tutoring services.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300"
                >
                  Book Tutoring
                </Link>
                <Link
                  to="/sponsors"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Partner With Us
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

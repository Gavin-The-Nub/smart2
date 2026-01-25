import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";
import { Check } from "lucide-react";
import studentsLearningImage from "../assets/students-learning-together.jpg";
import { useToast } from "@/hooks/use-toast";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useMetaTags } from "@/hooks/useMetaTags";
import { supabase } from "@/lib/supabase";

interface CreditPlan {
  id: string;
  slug: string;
  name: string;
  credits: number;
  price_usd?: number;
  price_php?: number;
  hours?: number;
  price_per_hour?: number;
  price_per_credit?: number;
  description?: string;
  region: string;
  sort_order: number;
  is_active: boolean;
}

const CheckIcon = () => <Check className="w-5 h-5 text-green-500" />;

export default function Pricing() {
  useMetaTags({
    title: "Pricing & Credits — Smart Brain TLC",
    description: "Affordable, flexible credit-based pricing for high-quality tutoring sessions. Choose from US or Philippines pricing plans. Enroll One, Empower Two.",
    url: "https://smartbrainlearning.org/pricing",
  });

  const [activeTab, setActiveTab] = useState<"us" | "ph">("us");
  const [creditPlans, setCreditPlans] = useState<CreditPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [purchaseMsg, setPurchaseMsg] = useState<string | null>(null);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const { toast } = useToast();
  const { location } = useGeolocation();

  // Set region based on user's location
  useEffect(() => {
    if (location) {
      setActiveTab(location.country === "PH" ? "ph" : "us");
    } else {
      // Default to US if location is not available or denied
      setActiveTab("us");
    }
  }, [location]);

  // Fetch credit plans based on active tab
  useEffect(() => {
    const fetchCreditPlans = async () => {
      try {
        setLoading(true);
        const region = activeTab === "us" ? "US" : "PH";

        const { data, error } = await supabase
          .from("credit_plans")
          .select("*")
          .eq("region", region)
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;

        // Transform the data to match our UI expectations
        const transformedData = (data || []).map((plan) => ({
          ...plan,
          // Convert string prices to numbers
          price_usd: plan.price_usd ? parseFloat(plan.price_usd) : null,
          price_php: plan.price_php ? parseFloat(plan.price_php) : null,
          hours: plan.hours ? parseFloat(plan.hours) : null,
          price_per_credit: plan.price_per_credit
            ? parseFloat(plan.price_per_credit)
            : null,
        }));

        setCreditPlans(transformedData);
      } catch (err) {
        console.error("Error fetching credit plans:", err);
        toast({
          title: "Error",
          description:
            "Failed to load pricing information. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCreditPlans();
  }, [activeTab, toast]);

  const getCurrencySymbol = (region: string) => {
    return region === "US" ? "USD" : "PHP";
  };

  // Format price with currency symbol
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPrice = (plan: CreditPlan) => {
    const price = activeTab === "us" ? plan.price_usd : plan.price_php;
    return typeof price === "number" ? price : 0;
  };

  // Convert credit plans to the format expected by the UI
  const currentPlans = creditPlans.map((plan) => ({
    ...plan,
    price: formatPrice(
      activeTab === "us" ? plan.price_usd || 0 : plan.price_php || 0,
      activeTab === "us" ? "USD" : "PHP"
    ),
    credits: `${plan.credits} credits`,
    duration: plan.hours ? `≈ ${plan.hours} hrs` : "",
    description: plan.description || "Best for your learning needs",
    features: [
      `${plan.hours || plan.credits / 2} hours of 1:1 tutoring`,
      plan.credits > 10
        ? "Priority booking & progress dashboard"
        : "Standard booking",
      plan.credits > 20
        ? "Shareable with family members"
        : "Single student use",
    ],
    isPopular: plan.sort_order === 2 || plan.name.includes("Standard"),
    primaryCta: "Get Started",
    secondaryCta: "How credits work",
  }));

  const handleDemoPurchase = async (planId: string) => {
    setPurchaseMsg(null);
    setPurchasingId(planId);

    try {
      // Simulate purchase process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const plan = creditPlans.find((p) => p.id === planId);
      if (plan) {
        const price = getPrice(plan);
        const currency = getCurrencySymbol(plan.region);

        setPurchaseMsg(
          `Demo purchase successful! You would have received ${
            plan.credits
          } credits for ${formatPrice(price, currency)}.`
        );

        toast({
          title: "Demo Purchase",
          description: `You've successfully purchased ${plan.credits} credits!`,
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setPurchaseMsg("Error processing purchase. Please try again.");
      toast({
        title: "Error",
        description: "Failed to process purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 md:pb-28 -mt-24 pt-24 bg-[#F7FAFD]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-12">
            {/* Left Content */}
            <div className="flex-1 lg:pr-8">
              <div className="max-w-xl">
                <Reveal>
                  <h1 className="text-3xl lg:text-5xl lg:leading-normal mb-6 font-bold font-heading wow animate__animated animate__fadeIn">
                    Pricing & <span className="text-blue-500">Credits</span>
                  </h1>
                  <p className="text-blueGray-400 leading-relaxed mb-8 wow animate__animated animate__fadeIn text-lg">
                    Buy credits to book tutoring sessions that fit your child's
                    needs. Every enrollment helps fund sponsorships for learners
                    in need.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right Image with Corner Holders */}
            <div className="flex-1 relative">
              <div className="relative max-w-lg mx-auto">
                <Reveal delay={200}>
                  {/* Corner Holders */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg z-10"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg z-10"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg z-10"></div>

                  {/* Main Image */}
                  <img
                    className="jump rounded-xl shadow-2xl wow animate__animated animate__fadeIn w-full h-auto"
                    src={studentsLearningImage}
                    alt="Students learning together in an engaging educational environment"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Pricing for{" "}
                {activeTab === "ph" ? "Philippines" : "International"}
              </h2>
              {!location && (
                <p className="text-slate-500">
                  Allow location access to auto-detect your region, or choose a
                  tab below.
                </p>
              )}
            </div>
          </Reveal>

          {/* Region Tabs (US / PH) */}
          <Reveal>
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("us")}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === "us"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  US
                </button>
                <button
                  onClick={() => setActiveTab("ph")}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === "ph"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Philippines
                </button>
              </div>
            </div>
          </Reveal>

          {/* Pricing Cards */}
          <Stagger baseDelay={100} step={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                // Loading state
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl p-8 ring-1 ring-slate-200 animate-pulse h-[600px]"
                    >
                      <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                      <div className="h-12 bg-slate-200 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-slate-200 rounded w-1/3 mb-8"></div>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className="h-5 w-5 bg-slate-200 rounded-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              ) : currentPlans.length > 0 ? (
                // Show plans when loaded
                currentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                      plan.isPopular
                        ? "bg-[#2563EB] text-white shadow-xl hover:shadow-2xl"
                        : "bg-white ring-1 ring-slate-200"
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-white text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          plan.isPopular ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <div
                        className={`text-4xl font-bold mb-1 ${
                          plan.isPopular ? "text-white" : "text-[#2563EB]"
                        }`}
                      >
                        {plan.price}
                      </div>
                      <div
                        className={`text-lg font-medium mb-1 ${
                          plan.isPopular ? "text-blue-100" : "text-slate-600"
                        }`}
                      >
                        {plan.credits}
                      </div>
                      {plan.duration && (
                        <div
                          className={`text-sm mb-4 ${
                            plan.isPopular ? "text-blue-100" : "text-slate-500"
                          }`}
                        >
                          {plan.duration}
                        </div>
                      )}
                      <p
                        className={`text-sm mb-8 ${
                          plan.isPopular ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {plan.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckIcon />
                            <span
                              className={`text-sm ${
                                plan.isPopular ? "text-white" : "text-slate-600"
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTAs */}
                      <div className="space-y-3">
                        <a
                          href="https://app.smartbrainlearning.org/"
                          className={`block w-full py-3 px-6 text-sm font-semibold rounded-lg transition-colors text-center ${
                            plan.isPopular
                              ? "bg-white text-[#2563EB] hover:bg-slate-50"
                              : "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                          }`}
                        >
                          {plan.primaryCta}
                        </a>
                        <a
                          href="/faq#credits"
                          className={`block w-full py-3 px-6 text-sm font-medium rounded-lg transition-colors ${
                            plan.isPopular
                              ? "border border-blue-400 text-white hover:bg-blue-600/20"
                              : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {plan.secondaryCta}
                        </a>
                        {purchaseMsg && purchasingId === plan.id && (
                          <div className="text-xs text-center text-green-700">
                            {purchaseMsg}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // No plans available
                <div className="col-span-4 text-center py-12">
                  <p className="text-slate-500">
                    No pricing plans available at the moment. Please check back
                    later.
                  </p>
                </div>
              )}
            </div>
          </Stagger>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="max-w-lg mb-16">
              <h2 className="mb-4 text-3xl lg:text-4xl font-bold font-heading text-slate-900">
                <span>Compare </span>
                <span className="text-[#2563EB]">plans </span>
                <span>and features</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-500">
                Find the perfect plan for your learning journey
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-slate-900">
                        Features
                      </th>
                      {!loading && currentPlans.length > 0 ? (
                        currentPlans.map((plan) => (
                          <th
                            key={plan.id}
                            className={`text-center py-4 px-6 font-semibold ${
                              plan.isPopular
                                ? "bg-[#2563EB] text-white"
                                : "text-slate-900"
                            }`}
                          >
                            {plan.name}
                          </th>
                        ))
                      ) : (
                        <th
                          colSpan={4}
                          className="py-4 px-6 text-center text-slate-500"
                        >
                          {loading ? "Loading..." : "No plans available"}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Session length options
                      </td>
                      {!loading && currentPlans.length > 0 ? (
                        currentPlans.map((plan) => (
                          <td
                            key={plan.id}
                            className="py-4 px-6 text-center text-slate-500 text-sm"
                          >
                            30 or 60 minutes
                          </td>
                        ))
                      ) : (
                        <td
                          colSpan={4}
                          className="py-4 px-6 text-center text-slate-400 text-sm"
                        >
                          {loading ? "Loading..." : "N/A"}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Credits included
                      </td>
                      {!loading && currentPlans.length > 0 ? (
                        currentPlans.map((plan) => (
                          <td
                            key={plan.id}
                            className="py-4 px-6 text-center text-slate-500 text-sm"
                          >
                            {plan.credits}
                          </td>
                        ))
                      ) : (
                        <td
                          colSpan={4}
                          className="py-4 px-6 text-center text-slate-400 text-sm"
                        >
                          {loading ? "Loading..." : "N/A"}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Estimated hours
                      </td>
                      {!loading && currentPlans.length > 0 ? (
                        currentPlans.map((plan) => (
                          <td
                            key={plan.id}
                            className="py-4 px-6 text-center text-slate-500 text-sm"
                          >
                            {plan.duration || "N/A"}
                          </td>
                        ))
                      ) : (
                        <td
                          colSpan={4}
                          className="py-4 px-6 text-center text-slate-400 text-sm"
                        >
                          {loading ? "Loading..." : "N/A"}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footnote */}
      <section className="py-10 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6">
        
        </div>
      </section>

      <Footer />
    </div>
  );
}

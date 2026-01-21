import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/animations/Reveal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { useMetaTags } from "../hooks/useMetaTags";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

const SUPPORT_EMAIL = "admin@smartbrainlearning.org";

export default function Contact() {
  useMetaTags({
    title: "Contact Us - Smart Brain TLC",
    description: "Get in touch with Smart Brain TLC. Have questions about our tutoring services, sponsorship programs, or want to partner with us? Contact us today.",
    url: "https://smartbrainlearning.org/contact",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize EmailJS on component mount
  React.useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const templateParams = {
        to_email: SUPPORT_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        category: formData.category,
        message: formData.message,
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
      console.error("Email send error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>

        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Get in Touch
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-slate-600 mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-green-800 font-medium">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-800 font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        disabled={isLoading}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        disabled={isLoading}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={isLoading}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">I am a... *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sponsor">Sponsor</SelectItem>
                          <SelectItem value="tutor">Tutor</SelectItem>
                          <SelectItem value="partner">Partner</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      disabled={isLoading}
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </Reveal>

            {/* Contact Information */}
            <Reveal delay={200}>
              <div className="space-y-8">
                {/* Support Team Image */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Our Support Team
                  </h3>
                  <p className="text-slate-600">
                    Friendly support staff ready to help you succeed
                  </p>
                </div>

                {/* Contact Details */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          Email our team
                        </p>
                        <a
                          href={`mailto:${SUPPORT_EMAIL}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {SUPPORT_EMAIL}
                        </a>
                        <p className="text-slate-600 mt-1">
                          We monitor this inbox for all inquiries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

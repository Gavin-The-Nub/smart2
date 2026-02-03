import React, { useState, useEffect } from "react";
import { cms } from "../lib/cms";
import { CoreValue } from "../data/cms-sample";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Reveal } from "../components/animations/Reveal";
import { Stagger } from "../components/animations/Stagger";
import { useMetaTags } from "../hooks/useMetaTags";
import studentsImage from "../assets/students-learning-together.jpg";
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";

export default function About() {
  useMetaTags({
    title: "About Us - Smart Brain TLC | Enroll One, Empower Two",
    description: "Smart Brain TLC Inc. is an accessible, online-first tutoring platform that provides students with affordable, high-quality instruction while giving back—when one student enrolls, another learner in need gets a tutorial for free.",
    url: "https://smartbrainlearning.org/about",
  });

  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);

  useEffect(() => {
    cms.getCoreValues().then(setCoreValues).catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative -mt-24 pt-24">
        <div
          className="hidden lg:block absolute inset-0 w-1/2 ml-auto bg-blueGray-100 z-0"
          style={{ zIndex: "-1" }}
        ></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-3">
            <div className="w-full lg:w-1/2 px-3">
              <div className="py-12">
                <Reveal>
                  <div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
                    <h1 className="text-3xl lg:text-5xl mb-4 font-bold font-heading">
                      Enroll One,{" "}
                      <span className="text-blue-500">Empower Two</span>
                    </h1>
                    <p className="text-blueGray-400 leading-relaxed mb-4">
                      Smart Brain TLC Inc. is an accessible, online-first
                      tutoring platform that provides students with affordable,
                      high-quality instruction while giving back—when one
                      student enrolls, another learner in need gets a tutorial
                      for free.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={300}>
                  <div className="text-center lg:text-left">
                   
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-3 lg:bg-blueGray-10 mb-12 lg:mb-0 pb-10">
              <Reveal delay={600}>
                <div className="flex items-center justify-center">
                  <img
                    className="lg:max-w-lg w-full h-auto rounded-lg shadow-lg"
                    src={studentsImage}
                    alt="Students learning together"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-blueGray-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">
                  <span>Our </span>
                  <span className="text-blue-500">Mission & Vision</span>
                </h2>
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-blueGray-400 leading-loose">
                  We believe quality education should be a right, not a
                  privilege, and we're committed to making that vision a
                  reality.
                </p>
              </div>
            </div>
          </Reveal>

          <Stagger baseDelay={300} step={200}>
            <div className="flex flex-wrap -mx-3 -mb-6 text-center">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <div className="p-12 bg-white shadow rounded hover:shadow-lg transition-shadow duration-300">
                  <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full mb-6">
                    🎯
                  </div>
                  <h3 className="mb-4 font-bold font-heading text-xl">
                    Our Mission
                  </h3>
                  <p className="text-sm text-blueGray-400 leading-relaxed">
                    "Smart Brain TLC Inc. is committed to providing engaging,
                    high-quality educational services that inspire learners of
                    all ages to achieve their full potential. Through
                    personalized tutoring, enrichment programs, and innovative
                    learning experiences, we aim to foster critical thinking,
                    creativity, and a lifelong love of learning while supporting
                    students in reaching their academic and personal goals. We
                    strive to make education accessible, engaging, and
                    empowering, helping each learner succeed in school and
                    beyond."
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <div className="p-12 bg-white shadow rounded hover:shadow-lg transition-shadow duration-300">
                  <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full mb-6">
                    🌟
                  </div>
                  <h3 className="mb-4 font-bold font-heading text-xl">
                    Our Vision
                  </h3>
                  <p className="text-sm text-blueGray-400 leading-relaxed">
                    "Our vision is to become a leading educational organization
                    that empowers learners globally, providing access to quality
                    learning opportunities, innovative teaching methods, and
                    supportive resources. We aspire to nurture confident,
                    capable, and curious individuals who are prepared to succeed
                    academically, embrace lifelong learning, and make a positive
                    impact in their communities."
                  </p>
                </div>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl mt-2 mb-4 font-bold font-heading">
                What <span className="text-blue-500">Drives Us</span>
              </h2>
              <p className="text-blueGray-400 leading-loose">
                These core values guide everything we do at Smart Brain TLC
              </p>
            </div>
          </Reveal>

          <Stagger baseDelay={400} step={150}>
            <div className="flex flex-wrap justify-center -mx-3">
              {coreValues.map((item, index) => (
                <div
                  key={item.id}
                  className="w-1/2 md:w-1/3 lg:w-1/5 px-3 mb-8"
                >
                  <div className="text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{item.value}</h3>
                    <p className="text-sm text-blueGray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-blueGray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-3">
            <div className="w-full lg:w-1/2 px-3 mb-12 lg:mb-0">
              <Reveal>
                <div className="max-w-lg">
                  <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl mb-4">
                    Our Story
                  </span>
                  <h2 className="text-3xl md:text-4xl mb-6 font-bold font-heading">
                    <span className="text-blue-500">Smart Brain TLC Inc.</span>
                  </h2>
                  {/* Only the new first paragraph visible */}
                  <p className="text-blueGray-400 leading-relaxed mb-6">
                    Smart Brain TLC Inc. was built from a story of resilience,
                    compassion, and the belief that every child—no matter their
                    background—deserves a chance to succeed. Founded by educator
                    Ilyne Cendy Root, who overcame early hardship through
                    courage, creativity, and education, Smart Brain TLC carries
                    forward her lifelong mission: to make learning personal,
                    accessible, and transformative.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-lg font-semibold">
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="z-[1000] max-w-3xl w-[95vw] h-[85vh] p-0 overflow-hidden flex flex-col">
                      <ScrollArea className="p-8 h-full">
                        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-blue-600">
                          About Smart Brain TLC & Founder
                        </h2>
                        <div className="space-y-5 text-blueGray-700 text-base leading-relaxed">
                          <p>
                            Smart Brain TLC Inc. was built from a story of
                            resilience, compassion, and the belief that every
                            child—no matter their background—deserves a chance
                            to succeed. Founded by educator Ilyne Cendy Root,
                            who overcame early hardship through courage,
                            creativity, and education, Smart Brain TLC carries
                            forward her lifelong mission: to make learning
                            personal, accessible, and transformative.
                          </p>
                          <p>
                            From teaching learners with autism and ADHD, to
                            tutoring students across Asia, to serving schools in
                            the United States, Ilyne discovered one truth:
                            students thrive when someone believes in them.
                            Guided by this conviction, Smart Brain TLC provides
                            high-quality, affordable 1-on-1 tutoring for both
                            private students and underserved learners who need
                            extra care and individualized support.
                          </p>
                          <p>
                            What began as a small tutoring effort has grown into
                            an international education initiative powered by
                            passion, purpose, and community. Through programs
                            like Enroll One, Empower Two, Smart Brain TLC
                            connects students from around the world, ensuring
                            that enrolling one child helps uplift another with
                            limited resources.
                          </p>
                          <p>
                            Today, Smart Brain TLC partners with schools,
                            families, and organizations to deliver tutoring,
                            literacy support, early childhood programs, and
                            mentorship—always grounded in empathy, excellence,
                            and heart.
                          </p>
                          <p>
                            <strong>Our work reflects a simple promise:</strong>
                          </p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>Every learner can shine.</li>
                            <li>Every learner deserves a chance.</li>
                            <li>Every learner matters.</li>
                          </ul>
                          <p className="font-semibold text-blue-800">
                            Smart Brain TLC exists to make that promise a
                            reality.
                          </p>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </Reveal>
            </div>
            <div className="w-full lg:w-1/2 px-3">
              <Reveal delay={400}>
                <div className="text-center">
                  <img
                    className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                    src={studentsImage}
                    alt="Our founder's vision"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Ready to Join Our{" "}
                <span className="text-blue-500">Learning Community</span>?
              </h2>
              <p className="text-blueGray-400 leading-loose mb-8">
                Whether you're a student ready to learn, an educator wanting to
                teach, or a partner looking to make an impact, there's a place
                for you at Smart Brain TLC.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg">
                <a href="https://app.smartbrainlearning.org/">Book Tutoring</a>
                </Button>
                
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

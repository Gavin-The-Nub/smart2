import { CheckCircle, Users, Building, GraduationCap, Award } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { Stagger } from '../components/animations/Stagger';
import { useMetaTags } from '../hooks/useMetaTags';
import studentsImage from '../assets/students-learning-together.jpg';
import { Header } from '../components/Header';
import Footer from '../components/Footer';


const Sponsors = () => {
  useMetaTags({
    title: "Partner With Us — Smart Brain TLC | Enroll One, Empower Two",
    description: "At Smart Brain TLC Inc., we partner with schools, organizations, and families to deliver high-quality online tutoring and academic support services through our approved instructional programs.",
    url: "https://smartbrainlearning.org/sponsors",
  });



  return (
    <>
      <Header />

      {/* Hero Section (copied styling/layout/animation from index.tsx) */}
      <section className="relative overflow-hidden pb-20 md:pb-28 -mt-24 pt-24 bg-[#F7FAFD]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-12">
            {/* Left Content */}
            <div className="flex-1 lg:pr-8">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 font-heading wow animate__animated animate__fadeIn">
                  Partner With <span className="text-blue-500">Us</span>
                </h1>
                <div className="text-blueGray-400 leading-relaxed mb-8 wow animate__animated animate__fadeIn text-lg space-y-4">
                  <p>
                    At Smart Brain TLC Inc., we partner with schools, organizations, and families to deliver high-quality online tutoring and academic support services through our approved instructional programs.
                  </p>
                  <p>
                    Through our collaboration with Global Bright Futures Foundation Inc., some student services may be supported through nonprofit-funded sponsorship and education support credits, allowing expanded access for students in need.
                  </p>
                  <p>
                    By partnering with us, you are:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Supporting expanded access to tutoring and academic enrichment</li>
                    <li>Participating in a structured education support program</li>
                    <li>Helping increase learning opportunities for students across communities</li>
                  </ul>
                  <p>
                    Our focus is simple: deliver consistent, high-quality instruction while working with mission-aligned partners who help expand educational access.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a className="btn-primary py-4 px-8 wow animate__animated animate__fadeIn hover-up-2 text-center" href="http://globalbrightfutures.org/" target="_blank" rel="noopener noreferrer">
                    Sponsor a Student
                  </a>
                  
                </div>
              </div>
            </div>
            {/* Right Image with Corner Holders */}
            <div className="flex-1 relative">
              <div className="relative max-w-lg mx-auto">
                {/* Corner Holders */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg z-10"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg z-10"></div>
                {/* Main Image */}
                <img
                  className="jump rounded-xl shadow-2xl wow animate__animated animate__fadeIn w-full h-auto"
                  src={studentsImage}
                  alt="Students learning together"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Types Section */}
      <section className="bg-[#F7FAFD] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
            <div>
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold font-heading">
                  <span>Sponsorship </span>
                  <span className="text-blue-500">Opportunities </span>
                  <br />
                  <span>for every heart to give</span>
                </h2>
              </Reveal>
            </div>

          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" baseDelay={300} step={200}>
            {/* 1. Tutoring Sponsorship */}
            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users size={28} className="text-blue-500" />
              </div>
              <h3 className="mb-4 font-bold font-heading text-xl">Tutoring Sponsorship</h3>
              <p className="text-sm text-blueGray-400 leading-relaxed mb-6">
                For **$30**, you can sponsor **1 student in the U.S. and 1 student outside the U.S.** with quality tutoring support.
              </p>
              <ul className="text-left text-sm text-blueGray-400 mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Directly funds tutoring hours for two students
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Helps bridge learning gaps and build confidence
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  A simple, powerful way to make an immediate impact
                </li>
              </ul>

            </div>

            {/* 2. School Supplies Sponsorship */}
            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building size={28} className="text-blue-500" />
              </div>
              <h3 className="mb-4 font-bold font-heading text-xl">School Supplies Sponsorship</h3>
              <p className="text-sm text-blueGray-400 leading-relaxed mb-6">
                Give students the tools they need to learn—backpacks, notebooks, pencils, and more. **Any amount** helps.
              </p>
              <ul className="text-left text-sm text-blueGray-400 mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Helps provide basic and essential school supplies
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Reduces barriers for students who come to school without materials
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Great option for individuals, families, and small groups
                </li>
              </ul>

            </div>

            {/* 3. Public School Funds Sponsorship */}
            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap size={28} className="text-blue-500" />
              </div>
              <h3 className="mb-4 font-bold font-heading text-xl">Public School Funds Sponsorship</h3>
              <p className="text-sm text-blueGray-400 leading-relaxed mb-6">
                Support **public schools** with additional resources, programs, and academic support. **Any amount** is welcome.
              </p>
              <ul className="text-left text-sm text-blueGray-400 mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Helps strengthen under-resourced public schools
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Can be directed toward enrichment, tutoring, or special projects
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Ideal for donors passionate about public education
                </li>
              </ul>

            </div>

            {/* 4. Monthly Sponsorship */}
            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Award size={28} className="text-blue-500" />
              </div>
              <h3 className="mb-4 font-bold font-heading text-xl">Monthly Sponsorship</h3>
              <p className="text-sm text-blueGray-400 leading-relaxed mb-6">
                Set up a **monthly gift** that we will carefully distribute across the three sponsorship areas above.
              </p>
              <ul className="text-left text-sm text-blueGray-400 mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Automatically supports tutoring, school supplies, and public school funds
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Provides steady, predictable support for students and schools
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Flexible amount—give what fits your heart and budget
                </li>
              </ul>

            </div>
          </Stagger>

          <div className="mt-12 text-center">
            <a
              href="http://globalbrightfutures.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4 px-8 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-20 bg-blue-500">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <Reveal>
            <h2 className="max-w-lg mx-auto mb-4 text-4xl font-bold font-heading text-white">
              Every enrollment funds a brighter future
            </h2>
          </Reveal>

          <Reveal delay={400}>
            <a
              href="http://globalbrightfutures.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4 px-8 text-blue-500 font-semibold bg-white hover:bg-blue-50 rounded transition-colors"
            >
              Become a Partner Today
            </a>
          </Reveal>
        </div>
      </section>



      <Footer />
    </>
  );
};

export default Sponsors;
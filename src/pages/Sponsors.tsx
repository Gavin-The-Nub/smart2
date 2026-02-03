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
    description: "At Smart Brain TLC's Enroll One, Empower Two initiative, every enrollment funds an opportunity for another child. By partnering with us, you're not just giving lessons—you're giving hope.",
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
                <div className="text-blueGray-400 leading-relaxed mb-8 wow animate__animated animate__fadeIn text-lg">
                  At Smart Brain TLC's Enroll One, Empower Two initiative, every enrollment funds an opportunity for another child. By partnering with us, you're not just giving lessons—you're giving hope.
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a className="btn-primary py-4 px-8 wow animate__animated animate__fadeIn hover-up-2 text-center" href="#partner-inquiry">
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
            <div>
              <Reveal delay={200}>
                <p className="text-blueGray-400 leading-loose">
                  Choose the sponsorship option that best matches how you’d like to support our students and schools.
                </p>
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
              href="https://app.globalbrightfutures.org/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4 px-8 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* Partner Benefits Section */}
      <section className="pt-20 pb-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="max-w-lg mx-auto mb-4 text-4xl font-bold font-heading">
                <span>Partner </span>
                <span className="text-blue-500">Benefits </span>
                <span>& Recognition</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="max-w-sm mx-auto text-lg text-blueGray-400">
                Join a community of changemakers making education accessible worldwide
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" baseDelay={300} step={150}>
            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold font-heading">Recognition & Visibility</h3>
              <p className="text-sm text-blueGray-400">Featured on our website, newsletters, and social media</p>
            </div>

            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold font-heading">Impact Reports</h3>
              <p className="text-sm text-blueGray-400">Exclusive impact reports and regular updates</p>
            </div>

            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold font-heading">Community Engagement</h3>
              <p className="text-sm text-blueGray-400">Employee and community engagement opportunities</p>
            </div>

            <div className="h-full flex flex-col rounded-3xl bg-white shadow-lg ring-1 ring-slate-100 p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold font-heading">Direct Connection</h3>
              <p className="text-sm text-blueGray-400">Direct connection to the students you empower</p>
            </div>
          </Stagger>
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
          <Reveal delay={200}>
            <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">
              Whether you're a parent, business owner, educator, or philanthropist, partnering with Smart Brain TLC gives you a meaningful way to invest in education and equity.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <a
              href="#partner-inquiry"
              className="inline-block py-4 px-8 text-blue-500 font-semibold bg-white hover:bg-blue-50 rounded transition-colors"
            >
              Become a Partner Today
            </a>
          </Reveal>
        </div>
      </section>

      {/* Partner Inquiry Form */}
      <section id="partner-inquiry" className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="max-w-md mb-8 mx-auto">
              <Reveal>
                <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
                  Partner With Us
                </span>
              </Reveal>
              <Reveal delay={200}>
                <h2 className="mt-2 text-4xl font-bold font-heading">
                  We will <span className="text-blue-500">be glad</span> to hear from you!
                </h2>
              </Reveal>
            </div>

            <Reveal delay={400}>
              <form className="text-left bg-white p-8 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Sponsorship
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select sponsorship type</option>
                      <option>Tutoring Sponsorship ($30 for 1 US + 1 international student)</option>
                      <option>School Supplies Sponsorship (any amount)</option>
                      <option>Public School Funds Sponsorship (any amount)</option>
                      <option>Monthly Sponsorship (distributed across all three)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approximate Budget/Interest Level
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $500/month, 10 students, etc."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message/Goals
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your goals and how you'd like to partner with us..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Submit Partnership Inquiry
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Sponsors;
import React, { useEffect } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Reveal } from "../components/animations/Reveal";
import { Stagger } from "../components/animations/Stagger";
import studentsImage from "../assets/students-learning-together.jpg";
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";

export default function About() {
  useEffect(() => {
    document.title = "About Us - Smart Brain TLC | Enroll One, Empower Two";
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
                    <Button className="mr-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg">
                      Book Tutoring
                    </Button>
                    <Button
                      variant="outline"
                      className="px-8 py-4 rounded-lg border-blueGray-200 text-blueGray-600 hover:border-blueGray-300"
                    >
                      Partner With Us
                    </Button>
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
              {[
                {
                  value: "Empowerment",
                  icon: "💪",
                  description:
                    "Enabling students to reach their full potential",
                },
                {
                  value: "Equity",
                  icon: "⚖️",
                  description: "Ensuring fair access to quality education",
                },
                {
                  value: "Integrity",
                  icon: "🤝",
                  description: "Honest and transparent in all our interactions",
                },
                {
                  value: "Innovation",
                  icon: "💡",
                  description: "Continuously improving our teaching methods",
                },
                {
                  value: "Community",
                  icon: "🌍",
                  description: "Building connections that last beyond tutoring",
                },
              ].map((item, index) => (
                <div
                  key={item.value}
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
                    About Our Founder
                  </span>
                  <h2 className="text-3xl md:text-4xl mb-6 font-bold font-heading">
                    <span className="text-blue-500">Ilyne Cendy Root</span> –
                    Founder of Global Bright Futures Foundation Inc.
                  </h2>
                  {/* First two paragraphs */}
                  <p className="text-blueGray-400 leading-relaxed mb-6">
                    Ilyne Cendy Root’s journey is a story of resilience,
                    compassion, and unwavering dedication to transforming the
                    lives of learners and communities. Orphaned at a young age,
                    she grew up navigating life independently, moving between
                    relatives, and learning to stand on her own while managing
                    school responsibilities. Even in high school, she
                    demonstrated remarkable resourcefulness and courage, risking
                    her small allowance to sell items for profit—just to meet
                    daily needs. These early challenges instilled in her a
                    belief that determination, creativity, and taking risks can
                    overcome even the toughest circumstances, and sparked her
                    lifelong commitment to helping others thrive.
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
                          Ilyne Cendy Root’s Story
                        </h2>
                        <div className="space-y-5 text-blueGray-700 text-base leading-relaxed">
                          {/* Full story block, formatted as paragraphs and bullet list for key accomplishments */}
                          <p>
                            Ilyne Cendy Root’s journey is a story of resilience,
                            compassion, and unwavering dedication to
                            transforming the lives of learners and communities.
                            Orphaned at a young age, she grew up navigating life
                            independently, moving between relatives, and
                            learning to stand on her own while managing school
                            responsibilities. Even in high school, she
                            demonstrated remarkable resourcefulness and courage,
                            risking her small allowance to sell items for
                            profit—just to meet daily needs. These early
                            challenges instilled in her a belief that
                            determination, creativity, and taking risks can
                            overcome even the toughest circumstances, and
                            sparked her lifelong commitment to helping others
                            thrive.
                          </p>
                          <p>
                            Her personal struggles deepened her empathy for
                            students who lacked guidance, support, or
                            opportunity. Committed to education, she earned a
                            university scholarship and supported herself as a
                            student assistant in the university library. She
                            also tutored children—including learners with autism
                            and ADHD—often traveling long distances, teaching
                            late into the night, and waking early for her own
                            studies and student assistant work. Each act of
                            perseverance reinforced her understanding: education
                            has the power to change lives, but only when
                            personalized support and care are available.
                          </p>
                          <p>
                            After graduation, she worked in a Remedial Reading
                            Center, then took her passion abroad to Thailand,
                            teaching full-time during weekdays. On weekends, she
                            continued to serve students by tutoring Thai
                            learners, leading Brain Fitness programs for
                            children on Saturdays, and offering Sunday tutoring
                            for those needing extra guidance. Through these
                            experiences, she honed her expertise in early
                            childhood education, brain development, and
                            multilingual instruction, witnessing firsthand how
                            guidance, encouragement, and opportunity can unlock
                            a child’s potential.
                          </p>
                          <p>
                            Returning to the Philippines, she launched Easy to
                            Learn English, an online business teaching students
                            from Korea, Thailand, Japan, and Russia, helping
                            them gain confidence in reading, writing, and
                            speaking English. She then founded her tutorial and
                            learning center, providing individualized
                            instruction and community-based programs.
                            Recognizing the importance of mentorship and
                            literacy, she later created a buddy reading program,
                            pairing young volunteers with struggling readers.
                            She also partnered and guided scholar students from
                            the Department of Science and Technology in
                            developing teaching skills. Alongside her husband,
                            she dedicated time to caring for homeless children,
                            feeding and mentoring them, driven by the belief
                            that every child deserves dignity, nourishment, and
                            hope.
                          </p>
                          <p>
                            Her commitment to the broader community grew even
                            further. Ilyne began sponsoring churches, organizing
                            student achievement celebrations, providing school
                            supplies, delivering disaster relief to affected
                            communities and sponsoring college students with
                            laptops and paid teaching opportunities, helping
                            them to earn and complete their degrees while
                            gaining valuable classroom experience.
                          </p>
                          <p>
                            These initiatives reflect her conviction that
                            education and care are inseparable, and that
                            nurturing communities strengthens the foundation for
                            lifelong learning.
                          </p>
                          <p>
                            From these experiences, she developed the Enroll
                            One, Empower Two program, a signature initiative
                            where enrolling a single student helps sponsor and
                            empower underserved learners, creating a ripple
                            effect of education, mentorship, and opportunity.
                            This program later became the foundation for the
                            Global Bright Futures Foundation, an NGO dedicated
                            to expanding educational access worldwide.
                          </p>
                          <p>
                            Her international teaching journey exposed the
                            challenges faced by underserved and English
                            learners. Upon moving to the United States, she
                            recognized similar gaps—expensive tutoring, students
                            left behind in large group settings, inconsistent
                            tutoring, and limited support. Motivated by these
                            observations, she expanded Smart Brain TLC to the
                            U.S., providing affordable, high-quality 1-on-1
                            tutoring while building a pipeline of passionate
                            educators from the Philippines.
                          </p>
                          <p>
                            She actively partners with schools, centers, and
                            businesses in the U.S., the Philippines, and other
                            countries, ensuring her programs align with
                            institutions that share her vision for equitable
                            education. In the U.S., she has served as an
                            elementary teacher and School Lead in Math and
                            Science, guiding curriculum development and
                            instructional strategies, and mentor intern
                            teachers. She continues to advance her expertise
                            through extensive Professional Development, CA
                            holding full teacher certification, and is pursuing
                            a Master’s Degree in School Management.
                          </p>
                          <p>
                            Through every stage of her journey, Ilyne’s work has
                            been guided by a central question: How can I create
                            opportunities for learners and educators to thrive,
                            no matter their circumstances? The answer has shaped
                            every program she has built, every partnership she
                            has forged, and every life she has touched.
                          </p>
                          <h3 className="mt-6 mb-2 text-lg font-semibold text-blue-700">
                            Key Accomplishments
                          </h3>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>
                              Founded Smart Brain TLC Inc. in the Philippines
                              and expanded it to the United States.
                            </li>
                            <li>
                              Established the Global Bright Futures Foundation
                              to support learners and educators worldwide.
                            </li>
                            <li>
                              Launched Easy to Learn English, providing online
                              ESL instruction to students from Korea, Thailand,
                              Japan, and Russia.
                            </li>
                            <li>
                              Developed community-based programs for students
                              with learning gaps.
                            </li>
                            <li>
                              Created a youth-powered buddy reading program to
                              enhance literacy and mentorship.
                            </li>
                            <li>
                              Developed and implemented the Enroll One, Empower
                              Two program, multiplying impact for underserved
                              learners.
                            </li>
                            <li>
                              Sponsored, trained, and equipped college students
                              with laptops, development, and teaching
                              opportunities.
                            </li>
                            <li>
                              Partnered with schools in the U.S. and Philippines
                              to align programs with her mission and vision.
                            </li>
                            <li>
                              Sponsored churches, organized student achievement
                              celebrations, provided school supplies, and
                              delivered disaster relief to affected communities.
                            </li>
                            <li>
                              Served as School Lead in U.S. schools,
                              contributing to curriculum and professional
                              development.
                            </li>
                            <li>
                              Pursuing a Master’s Degree in School Management
                              while continuing global education initiatives.
                            </li>
                            <li>
                              Provides ongoing support for students, schools,
                              and communities through sponsorships and relief
                              programs.
                            </li>
                          </ul>
                          <h3 className="mt-6 mb-2 text-lg font-semibold text-blue-700">
                            A Mission Rooted in Heart and Experience
                          </h3>
                          <p>
                            Ilyne’s journey—from orphaned child to resourceful
                            high school entrepreneur, to international teacher,
                            and now founder of Smart Brain TLC and the Global
                            Bright Futures Foundation—is fueled not by
                            accolades, but by a deep-seated belief:
                          </p>
                          <p>
                            That every learner deserves individualized support,
                            every aspiring educator deserves mentorship, and
                            every community thrives when knowledge, care, and
                            opportunity are shared.
                          </p>
                          <p className="font-semibold text-blue-800">
                            Her life’s work is a testament to the idea that one
                            person’s dedication can inspire change for countless
                            others, creating a ripple of learning, empowerment,
                            and hope across the world.
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
                  Book Tutoring
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 rounded-lg border-blueGray-200 text-blueGray-600 hover:border-blueGray-300"
                >
                  Partner With Us
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

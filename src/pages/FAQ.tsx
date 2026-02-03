import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';
import { useMetaTags } from '../hooks/useMetaTags';
import { cms } from '../lib/cms';
import { FAQCategory } from '../data/cms-sample';

export default function FAQ() {
  useMetaTags({
    title: "Frequently Asked Questions - Smart Brain TLC",
    description: "Find answers to common questions about credits, sessions, sponsorships, tutoring services, and more at Smart Brain TLC.",
    url: "https://smartbrainlearning.org/faq",
  });

  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cms.getFAQs();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const Spinner = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
  );

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
              backgroundImage: "url('/vendor/monst/img/backgrounds/intersect.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center">
              <Reveal>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Frequently Asked <span className="text-blue-600">Questions</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Find answers to common questions about our tutoring services, sponsorship programs, and partnerships.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            {/* Tabs */}
            {loading ? (
              <div className="text-center py-12">
                <Spinner />
              </div>
            ) : (
             <>
              <Reveal>
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                  {categories.map((tab, index) => (
                    <button
                      key={tab.label}
                      onClick={() => {
                        setActiveTab(index);
                        setOpenItems(new Set()); 
                      }}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </Reveal>

              {/* FAQ Items */}
              <div className="max-w-4xl mx-auto">
                <Reveal delay={300}>
                  <div className="space-y-4">
                    {categories[activeTab]?.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                            openItems.has(index) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-5">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </Reveal>
              </div>
             </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { cms } from '../lib/cms';

// Star and Stars components for ratings
const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="currentColor"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-1" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="h-4 w-4 text-[#2563EB]" />
      ))}
      {half === 1 && (
        <span className="relative inline-block h-4 w-4">
          <Star className="absolute inset-0 h-4 w-4 text-slate-300" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="h-4 w-4 text-[#2563EB]" />
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 text-slate-300" />
      ))}
    </div>
  );
}

export const TestimonialsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [testimonialSlides, setTestimonialSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await cms.getReviews();
        const slides = reviews.map((r, i) => ({
          id: r.id, 
          image: r.avatarUrl || `/vendor/monst/img/placeholders/img-${(i % 4) + 1}.jpg`, // Fallback
          title: `“${r.content.substring(0, 60)}${r.content.length > 60 ? '...' : ''}”`,
          company: `${r.name} · ${r.role} ${r.location ? `· ${r.location}` : ''}`,
          alt: `${r.name} testimonial`,
          rating: r.rating
        }));
        setTestimonialSlides(slides);
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    if (testimonialSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
  };

  const prevSlide = () => {
    if (testimonialSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + testimonialSlides.length) % testimonialSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getTransformValue = () => {
    const slideWidth = isDesktop ? 50 : 100;
    return `-${currentSlide * slideWidth}%`;
  };

  if (loading) {
     return <div className="py-24 text-center">Loading reviews...</div>;
  }

  if (testimonialSlides.length === 0) {
      return null; // Or some empty state
  }

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left column: heading */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              What Families say about <span className="text-[#2563EB]">Smart Brain</span>
            </h2>
            <p className="mt-6 text-slate-500 leading-8 max-w-[36ch]">
              Real stories from parents and learners who improved confidence, grades, and study habits with our tutors.
            </p>
          </div>

          {/* Right column: carousel */}
          <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: "0.2s"}}>
            {/* Carousel viewport */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-8 transition-transform duration-500 ease-out"
                style={{transform: `translateX(${getTransformValue()})`}}
              >
                {testimonialSlides.map((slide) => (
                  <article 
                    key={slide.id}
                    className="w-full lg:w-1/2 shrink-0 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-6"
                  >
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-[320px] object-cover bg-gray-100"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{slide.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{slide.company}</p>
                      </div>
                      <Stars value={slide.rating ?? 5} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button 
                type="button" 
                aria-label="Previous testimonial" 
                className="h-9 w-9 grid place-content-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-300"
                onClick={prevSlide}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                {testimonialSlides.map((_, index) => (
                  <button 
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentSlide 
                        ? 'bg-[#2563EB] scale-125' 
                        : 'bg-slate-300 scale-100'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                type="button" 
                aria-label="Next testimonial" 
                className="h-9 w-9 grid place-content-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-300"
                onClick={nextSlide}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
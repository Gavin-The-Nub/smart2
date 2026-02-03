import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useMetaTags } from '../hooks/useMetaTags';
import { Calendar, Clock, ArrowRight, BookOpen, Heart, Users, Star, TrendingUp, Loader2 } from 'lucide-react';
import { useBlogs } from '../hooks/use-blogs';
import { format } from 'date-fns';



const CATEGORIES = [
  { name: "Learning Tips", color: "bg-blue-100 text-blue-800", icon: BookOpen },
  { name: "Education Equity", color: "bg-green-100 text-green-800", icon: Heart },
  { name: "Sponsor Stories", color: "bg-purple-100 text-purple-800", icon: Star },
  { name: "Tutor Spotlights", color: "bg-orange-100 text-orange-800", icon: Users },
  { name: "Impact Reports", color: "bg-pink-100 text-pink-800", icon: TrendingUp }
];

export default function Blog() {
  const { blogs, isLoading, error } = useBlogs();

  useMetaTags({
    title: "Blog & Resources - Smart Brain TLC",
    description: "Explore resources, tips, and stories from Smart Brain TLC. Discover insights on education, learning strategies, and our impact on communities.",
    url: "https://smartbrainlearning.org/blog",
  });

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
                Blog & Resources
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Explore resources, tips, and stories from Smart Brain TLC. Discover insights on education, learning strategies, and our impact on communities.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Badge 
                    key={category.name}
                    variant="secondary"
                    className={`${category.color} px-4 py-2 rounded-full font-medium cursor-pointer hover:scale-105 transition-transform flex items-center gap-2`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Badge>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20 text-red-500">
                Error loading posts. Please try again later.
              </div>
            ) : blogs.length === 0 ? (
              <div className="col-span-full text-center py-20 text-slate-500">
                No blog posts found.
              </div>
            ) : (
              blogs.map((post, index) => {
                const categoryData = CATEGORIES.find(cat => cat.name === post.category) || CATEGORIES[0];
                const IconComponent = categoryData.icon;
                
                return (
                  <Reveal key={post.id} delay={index * 100}>
                    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group h-full flex flex-col">
                      {/* Post Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        {post.featured_image ? (
                          <img 
                            src={post.featured_image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <IconComponent className="w-12 h-12 opacity-50" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge 
                            variant="secondary"
                            className={`${categoryData?.color} px-3 py-1 rounded-full font-medium flex items-center gap-1.5`}
                          >
                            <IconComponent className="w-3 h-3" />
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.publish_date ? format(new Date(post.publish_date), 'MMMM d, yyyy') : ''}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.read_time}
                          </div>
                        </div>

                        <h2 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-slate-600 line-clamp-3 mb-4 flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4">
                          <Link to={`/blog/${post.slug}`} className="w-full block">
                            <Button 
                              variant="outline" 
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors group/btn"
                            >
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })
            )}
          </div>
        </div>
      </section>

  

      <Footer />
    </div>
  );
}
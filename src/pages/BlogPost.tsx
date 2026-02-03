import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useBlogBySlug } from '../hooks/use-blogs';
import { useMetaTags } from '../hooks/useMetaTags';
import { Calendar, Clock, ArrowLeft, BookOpen, Heart, Users, Star, TrendingUp, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const CATEGORY_ICONS: Record<string, any> = {
  "Learning Tips": BookOpen,
  "Education Equity": Heart,
  "Sponsor Stories": Star,
  "Tutor Spotlights": Users,
  "Impact Reports": TrendingUp
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { blog, isLoading, error } = useBlogBySlug(slug);

  useMetaTags({
    title: blog ? `${blog.title} - Smart Brain TLC` : "Blog - Smart Brain TLC",
    description: blog?.excerpt || "Read our latest blog post.",
    url: `https://smartbrainlearning.org/blog/${slug}`,
    image: blog?.featured_image || undefined
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = CATEGORY_ICONS[blog.category] || BookOpen;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Post Header */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 mb-12">
          <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <Reveal>
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 gap-1.5 px-3 py-1">
                <IconComponent className="w-3.5 h-3.5" />
                {blog.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {blog.publish_date ? format(new Date(blog.publish_date), 'MMMM d, yyyy') : ''}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {blog.read_time}
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              {blog.title}
            </h1>
          </Reveal>

          {/* Featured Image */}
          <Reveal delay={200}>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-12 shadow-lg">
              {blog.featured_image ? (
                <img 
                  src={blog.featured_image} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                   <IconComponent className="w-20 h-20 opacity-20" />
                </div>
              )}
            </div>
          </Reveal>

          {/* Post Content */}
          <Reveal delay={300}>
            <div className="prose prose-lg prose-slate max-w-none">
              {/* 
                Handling simple markdown-like content by preserving whitespace.
                For full markdown support, we would need a library like react-markdown.
              */}
              <div className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                {blog.content}
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <Footer />
    </div>
  );
}

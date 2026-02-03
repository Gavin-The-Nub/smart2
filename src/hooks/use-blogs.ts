
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  read_time: string;
  featured_image: string | null;
  publish_date: string;
  created_at: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('BlogPosts')
          .select('id, title, slug, excerpt, category, read_time, featured_image, publish_date, created_at')
          .eq('is_published', true)
          .order('publish_date', { ascending: false });

        if (error) throw error;

        setBlogs(data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, isLoading, error };
}

export function useBlogBySlug(slug: string | undefined) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchBlog() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('BlogPosts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) throw error;

        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  return { blog, isLoading, error };
}

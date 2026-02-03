import { supabase } from './supabase';
import { FAQCategory, Review, WhyChooseUsItem, FAQItem, CoreValue } from '../data/cms-sample'; // Re-using interfaces

// Map database column names to our typescript interfaces if different
// In this case, snake_case DB columns vs camelCase typescript properties
// We'll do a simple mapping in the fetch functions

export const cms = {
  async getFAQs(): Promise<FAQCategory[]> {
    const { data, error } = await supabase
      .from('cms_faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }

    // Group flat FAQs into categories
    const grouped: Record<string, FAQItem[]> = {};
    
    data.forEach((row: any) => {
      if (!grouped[row.category]) {
        grouped[row.category] = [];
      }
      grouped[row.category].push({
        question: row.question,
        answer: row.answer
      });
    });

    // Determine category order (for now, just alphabetical or pre-defined list if needed)
    // The original sample data had a specific order: Parents, Sponsors, Tutors, Partners, Schools
    const order = ["Parents", "Sponsors", "Tutors", "Partners", "Schools"];
    
    return order.filter(k => grouped[k]).map(key => ({
      label: key,
      items: grouped[key]
    }));
  },

  async getReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from('cms_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      location: row.location,
      content: row.content,
      rating: row.rating,
      avatarUrl: row.avatar_url,
      date: row.date
    }));
  },

  async getWhyChooseUs(): Promise<WhyChooseUsItem[]> {
    const { data, error } = await supabase
      .from('cms_why_choose_us')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching Why Choose Us:', error);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      iconName: row.icon_name
    }));
  },

  async getCoreValues(): Promise<CoreValue[]> {
    const { data, error } = await supabase
      .from('cms_core_values')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching Core Values:', error);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      value: row.value,
      description: row.description,
      icon: row.icon,
      displayOrder: row.display_order
    }));
  }
};

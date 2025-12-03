import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://smartbrainlearning.org';
const DEFAULT_IMAGE = `${BASE_URL}/lovable-uploads/dedb8a29-3bfd-47fd-87aa-3442ff73939d.png`;
const SITE_NAME = 'Smart Brain TLC';

interface MetaTagsOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export function useMetaTags({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
}: MetaTagsOptions) {
  const location = useLocation();
  const currentUrl = url || `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tag
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);

    // Robots meta tag
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      // Remove noindex if it exists
      const robotsTag = document.querySelector('meta[name="robots"]');
      if (robotsTag) {
        robotsTag.remove();
      }
    }

    // Open Graph meta tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:image:type', 'image/png', true);

    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // Cleanup function (optional, but good practice)
    return () => {
      // Note: We don't remove meta tags on cleanup as they should persist
      // until the next page navigation updates them
    };
  }, [title, description, image, currentUrl, type, noindex]);
}


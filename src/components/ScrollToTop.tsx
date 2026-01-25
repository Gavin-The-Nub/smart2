import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that handles scroll behavior on route changes.
 * - Scrolls to top when navigating to a new page
 * - Scrolls to the specific section if there's a hash in the URL
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element
    if (hash) {
      // Small delay to ensure the page has rendered
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      // No hash, scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

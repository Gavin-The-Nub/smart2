import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

interface MobileMenuProps {
  open: boolean;
  items: NavItem[];
  expandedIndex: number | null;
  onToggleGroup: (idx: number) => void;
  onClose: () => void;
}

export function MobileMenu({
  open,
  items,
  expandedIndex,
  onToggleGroup,
  onClose,
}: MobileMenuProps) {
  // Focus trap for accessibility
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const focusable =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const menu = panelRef.current;
    if (!menu) return;
    const focusEls = menu.querySelectorAll(focusable);
    if (!focusEls.length) return;
    const first = focusEls[0] as HTMLElement;
    const last = focusEls[focusEls.length - 1] as HTMLElement;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    menu.addEventListener("keydown", trap);
    first.focus();
    return () => menu.removeEventListener("keydown", trap);
  }, [open]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[70] lg:hidden transition-all duration-200 ${
        open ? "" : "pointer-events-none opacity-0"
      }`}
      aria-modal="true"
      role="dialog"
      style={{ display: open ? "block" : "none" }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-blueGray-800 opacity-25 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Off-canvas panel (left) */}
      <aside
        id="mobile-nav-panel"
        ref={panelRef}
        className={`fixed inset-y-0 left-0 w-5/6 max-w-sm bg-white shadow-xl overflow-y-auto transition-transform duration-300 ease-out ${
          open ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blueGray-100">
          <a href="/" className="flex items-center">
            <img
              src="/lovable-uploads/dedb8a29-3bfd-47fd-87aa-3442ff73939d.png"
              alt="Smart Brain Tutorial and Learning Center"
              className="h-10 w-auto object-contain"
            />
          </a>
          <button className="p-2" onClick={onClose} aria-label="Close menu">
            <svg
              className="h-6 w-6 text-blueGray-400 cursor-pointer hover:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-6">
          {/* Menu Items */}
          <ul className="mobile-menu space-y-2">
            {items.map((item, idx) => {
              const hasDropdown = !!item.dropdown;
              const expanded = expandedIndex === idx;
              return (
                <li
                  key={item.label}
                  className={
                    expanded
                      ? "menu-item-has-children active"
                      : "menu-item-has-children"
                  }
                >
                  <div className="relative">
                    {hasDropdown ? (
                      <>
                        <span
                          className="menu-expand"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleGroup(idx);
                          }}
                        >
                          +
                        </span>
                        <button
                          className="block w-full text-left py-3 px-4 text-base text-blueGray-500 hover:bg-blue-50 hover:text-blue-500 relative"
                          onClick={() => onToggleGroup(idx)}
                        >
                          {item.label}
                        </button>
                      </>
                    ) : item.href && item.href.startsWith("/") ? (
                      <Link
                        to={item.href}
                        className="block w-full text-left py-3 px-4 text-base text-blueGray-500 hover:bg-blue-50 hover:text-blue-500 relative"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="block w-full text-left py-3 px-4 text-base text-blueGray-500 hover:bg-blue-50 hover:text-blue-500 relative"
                        onClick={onClose}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                  {hasDropdown && (
                    <ul
                      className={
                        expanded ? "dropdown pl-4 mt-2 space-y-1" : "hidden"
                      }
                    >
                      {item.dropdown!.map((sub) => (
                        <li key={sub.label}>
                          {sub.href.startsWith("/") ? (
                            <Link
                              to={sub.href}
                              className="block py-2 px-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500"
                              onClick={onClose}
                            >
                              {sub.label}
                            </Link>
                          ) : (
                            <a
                              href={sub.href}
                              className="block py-2 px-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500"
                              onClick={onClose}
                            >
                              {sub.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              to="/auth"
              className="block w-full px-4 py-3 text-center font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              onClick={onClose}
            >
              Sign Up
            </Link>
            <Link
              to="/auth"
              className="block w-full px-4 py-3 text-center text-blue-500 hover:text-blue-700 font-semibold border border-blue-200 hover:border-blue-300 rounded-lg"
              onClick={onClose}
            >
              Log In
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-blueGray-100">
            <p className="text-xs text-blueGray-400 mb-4">
              <span>Get in Touch: </span>
              <a
                href="mailto:admin@smartbrainlearning.org"
                className="text-blue-500 hover:text-blue-600 underline"
              >
               admin@smartbrainlearning.org
              </a>
            </p>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}

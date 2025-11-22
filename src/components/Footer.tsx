import React from "react";
// If header has a Logo component, import it (update path accordingly):
// import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-[#F7FAFD]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {/* If you have <Logo />, use it: <Logo /> */}
              {/* Otherwise paste the same <img>/<svg> used in header: */}
              <img
                src="/lovable-uploads/dedb8a29-3bfd-47fd-87aa-3442ff73939d.png"
                alt="Smart Brain TLC"
                className="h-[96px] w-auto"
                width={288}
                height={96}
              />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-900">
              Enroll One, Empower Two.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              To democratize education and empower communities by offering
              affordable tutoring and creating opportunities for underprivileged
              learners.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="/#learn" className="hover:text-slate-900">
                  Learn
                </a>
              </li>
              <li>
                <a href="/#programs" className="hover:text-slate-900">
                  Programs
                </a>
              </li>
              <li>
                <a href="/#get-involved" className="hover:text-slate-900">
                  Get Involved
                </a>
              </li>
              <li>
                <a href="/#support" className="hover:text-slate-900">
                  Support
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-slate-900">
                  Pricing &amp; Credits
                </a>
              </li>
              <li>
                <a href="/sponsors" className="hover:text-slate-900">
                  Sponsors / Partner With Us
                </a>
              </li>
              <li>
                <a href="/tutors" className="hover:text-slate-900">
                  Tutors
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-slate-900">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-slate-900">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="/legal/terms" className="hover:text-slate-900">
                  Terms
                </a>
              </li>
              <li>
                <a href="/legal/privacy" className="hover:text-slate-900">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/legal/refund" className="hover:text-slate-900">
                  Refund
                </a>
              </li>
              <li>
                <a href="/legal/accessibility" className="hover:text-slate-900">
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div aria-label="Contact">
            <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <span className="block font-medium text-slate-700">
                  US Office
                </span>
                5830 E 2nd St, Ste 7000, Casper, WY 82609, USA
                <br />
                <span className="text-slate-700">+1 805 317 4524</span>
              </li>
              <li>
                <span className="block font-medium text-slate-700">
                  PH Office
                </span>
                J and J Arcade Bldg., Lawaan 1, Talisay, Cebu 6045, PH
                <br />
                <span className="text-slate-700">0908 527 1364</span>
              </li>
              <li>
                <span className="block font-medium text-slate-700">Email</span>
                <a
                  href="mailto:sbtlcmanager@gmail.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  sbtlcmanager@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {year} Smart Brain TLC, Inc.</p>
          <p>1 credit = 30 minutes</p>
        </div>
      </div>
    </footer>
  );
}

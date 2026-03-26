import { Link } from "@tanstack/react-router";

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L20 6l14 12v16a2 2 0 01-2 2H8a2 2 0 01-2-2V18z"
        fill="oklch(var(--brand-green))"
        opacity="0.15"
      />
      <path
        d="M6 18L20 6l14 12"
        stroke="oklch(var(--brand-green))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="15"
        y="24"
        width="10"
        height="10"
        rx="1"
        fill="oklch(var(--brand-blue))"
        opacity="0.7"
      />
      <path
        d="M8 18v16a2 2 0 002 2h20a2 2 0 002-2V18"
        stroke="oklch(var(--brand-green))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="text-white py-10"
      style={{ backgroundColor: "oklch(var(--footer-navy))" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <HouseIcon className="w-8 h-8" />
              <span className="text-base font-bold">RentTrust</span>
            </div>
            <p className="text-sm text-white/50">
              Making rent more predictable
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/landlord"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              For Landlords
            </Link>
            <Link
              to="/tenant"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              For Tenants
            </Link>
            <Link
              to="/admin"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} RentTrust. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with &#10084; using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

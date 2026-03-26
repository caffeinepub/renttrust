import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

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

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const scrollToEarlyAccess = () => {
    if (currentPath !== "/") {
      router.navigate({ to: "/" });
      setTimeout(() => {
        document
          .getElementById("early-access")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .getElementById("early-access")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="nav.logo.link"
          >
            <HouseIcon className="w-9 h-9" />
            <span className="text-lg font-bold text-foreground tracking-tight">
              RentTrust
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/landlord"
              data-ocid="nav.landlord.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-brand-green font-semibold" }}
            >
              For Landlords
            </Link>
            <Link
              to="/tenant"
              data-ocid="nav.tenant.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-brand-green font-semibold" }}
            >
              For Tenants
            </Link>
            <Link
              to="/admin"
              data-ocid="nav.admin.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-brand-green font-semibold" }}
            >
              Admin
            </Link>
          </nav>

          <Button
            data-ocid="nav.early_access.button"
            onClick={scrollToEarlyAccess}
            className="hidden md:flex bg-brand-green hover:bg-brand-green/90 text-white rounded-full px-5 h-10 text-sm font-semibold"
          >
            Get Early Access
          </Button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-3 flex flex-col gap-3 pb-4">
            <Link
              to="/landlord"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground text-left px-1"
            >
              For Landlords
            </Link>
            <Link
              to="/tenant"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground text-left px-1"
            >
              For Tenants
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground text-left px-1"
            >
              Admin
            </Link>
            <Button
              onClick={scrollToEarlyAccess}
              className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full text-sm"
            >
              Get Early Access
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

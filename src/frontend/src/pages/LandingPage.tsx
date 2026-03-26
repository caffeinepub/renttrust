import { EarlyAccessForm } from "@/components/shared/EarlyAccessForm";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { UserType } from "../backend";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function RecordIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function UserCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function HeroIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md mx-auto"
    >
      <rect width="480" height="420" rx="24" fill="oklch(0.96 0.015 220)" />
      <rect
        x="130"
        y="200"
        width="220"
        height="160"
        rx="4"
        fill="#FFFFFF"
        stroke="oklch(var(--border))"
        strokeWidth="2"
      />
      <polygon
        points="110,205 240,100 370,205"
        fill="oklch(var(--brand-green))"
        opacity="0.85"
      />
      <polygon
        points="110,205 240,100 370,205"
        stroke="oklch(var(--brand-green))"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="205"
        y="290"
        width="70"
        height="70"
        rx="4"
        fill="oklch(var(--brand-blue))"
        opacity="0.8"
      />
      <circle cx="265" cy="327" r="5" fill="#FFFFFF" />
      <rect
        x="150"
        y="225"
        width="55"
        height="45"
        rx="4"
        fill="oklch(var(--section-tint))"
        stroke="oklch(var(--border))"
        strokeWidth="1.5"
      />
      <line
        x1="177"
        y1="225"
        x2="177"
        y2="270"
        stroke="oklch(var(--border))"
        strokeWidth="1"
      />
      <line
        x1="150"
        y1="247"
        x2="205"
        y2="247"
        stroke="oklch(var(--border))"
        strokeWidth="1"
      />
      <rect
        x="275"
        y="225"
        width="55"
        height="45"
        rx="4"
        fill="oklch(var(--section-tint))"
        stroke="oklch(var(--border))"
        strokeWidth="1.5"
      />
      <line
        x1="302"
        y1="225"
        x2="302"
        y2="270"
        stroke="oklch(var(--border))"
        strokeWidth="1"
      />
      <line
        x1="275"
        y1="247"
        x2="330"
        y2="247"
        stroke="oklch(var(--border))"
        strokeWidth="1"
      />
      <circle cx="90" cy="268" r="22" fill="oklch(0.85 0.04 50)" />
      <rect
        x="68"
        y="290"
        width="44"
        height="60"
        rx="6"
        fill="oklch(var(--brand-green))"
        opacity="0.7"
      />
      <circle cx="390" cy="268" r="22" fill="oklch(0.75 0.06 50)" />
      <rect
        x="368"
        y="290"
        width="44"
        height="60"
        rx="6"
        fill="oklch(var(--brand-blue))"
        opacity="0.7"
      />
      <circle
        cx="240"
        cy="168"
        r="14"
        stroke="oklch(0.82 0.16 85)"
        strokeWidth="3"
        fill="none"
      />
      <rect
        x="238"
        y="180"
        width="4"
        height="16"
        rx="1"
        fill="oklch(0.82 0.16 85)"
      />
      <rect
        x="238"
        y="190"
        width="8"
        height="3"
        rx="1"
        fill="oklch(0.82 0.16 85)"
      />
      <rect
        x="238"
        y="196"
        width="6"
        height="3"
        rx="1"
        fill="oklch(0.82 0.16 85)"
      />
      <circle cx="60" cy="160" r="28" fill="oklch(var(--brand-green))" />
      <path
        d="M48 160l8 8 16-16"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M404 130 L420 138 L420 158 Q420 168 404 176 Q388 168 388 158 L388 138 Z"
        fill="oklch(var(--brand-blue))"
      />
      <path
        d="M396 155l6 6 10-10"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="240"
        cy="368"
        rx="160"
        ry="12"
        fill="oklch(0.9 0.02 152)"
        opacity="0.5"
      />
    </svg>
  );
}

function IconBadge({
  color,
  children,
}: { color: "green" | "blue"; children: React.ReactNode }) {
  return (
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
        color === "green"
          ? "bg-brand-green/10 text-brand-green"
          : "bg-brand-blue/10 text-brand-blue"
      }`}
    >
      {children}
    </div>
  );
}

export function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "oklch(var(--section-tint))" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight mb-5">
                Stop guessing your tenants. Start trusting your rent.
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
                RentTrust helps you verify tenants before you rent — so you
                avoid defaults and get paid without stress.
              </p>
              {/* Role CTAs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/landlord" data-ocid="hero.landlord.link">
                  <Button className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full px-6 h-11 text-sm font-semibold">
                    I&apos;m a Landlord →
                  </Button>
                </Link>
                <Link to="/tenant" data-ocid="hero.tenant.link">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 h-11 text-sm font-semibold border-brand-blue text-brand-blue hover:bg-brand-blue/5"
                  >
                    I&apos;m a Tenant →
                  </Button>
                </Link>
              </div>
              <button
                type="button"
                data-ocid="hero.early_access.button"
                onClick={() => scrollTo("early-access")}
                className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Just show me the form
              </button>
            </div>
            <div className="flex justify-center">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">
            Every landlord has faced this
          </h2>
          <p className="text-lg text-white/80 mb-6">
            You rent to someone who &ldquo;looks responsible.&rdquo;
          </p>
          <p className="text-base text-white/60 mb-4">
            When annual renewal period comes:
          </p>
          <ul className="flex flex-col gap-3 mb-8">
            {[
              "Rent is delayed",
              "Excuses start",
              "You're chasing your own money",
              "Eviction becomes stressful and expensive",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-destructive/20 text-destructive flex items-center justify-center flex-shrink-0">
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-l-4 border-brand-green pl-5">
            <p className="text-white/90 font-medium">
              The truth is simple: You had no reliable way to verify the tenant
              before handing over your property.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6">
            Know who you&apos;re renting to — before you rent
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            RentTrust helps you make better decisions before a tenant moves in.
            We verify tenants and give you a clear picture of their reliability.
            No more guesswork.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section
        id="what-we-do"
        className="py-16 md:py-24"
        style={{ backgroundColor: "oklch(var(--section-tint))" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              What We Do
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <UserCheckIcon />,
                color: "green" as const,
                title: "Identity verification",
                text: "We confirm who your tenant actually is.",
              },
              {
                icon: <BriefcaseIcon />,
                color: "blue" as const,
                title: "Income and employment checks",
                text: "We verify they can afford your property.",
              },
              {
                icon: <RecordIcon />,
                color: "green" as const,
                title: "Tenant history and references",
                text: "We check how they've behaved as tenants before.",
              },
              {
                icon: <StarIcon />,
                color: "blue" as const,
                title: "RentTrust Score",
                text: "A simple trust rating so you can decide at a glance.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-border shadow-xs p-6 flex flex-col gap-4"
              >
                <IconBadge color={card.color}>{card.icon}</IconBadge>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    {card.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              How it works
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                step: "01",
                title: "Tenant applies through RentTrust",
                icon: <UserCheckIcon />,
              },
              {
                step: "02",
                title: "We verify and build their profile",
                icon: <VerifiedIcon />,
              },
              {
                step: "03",
                title: "You review and decide with confidence",
                icon: <BuildingIcon />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-border shadow-xs p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-brand-green bg-brand-green/10 rounded-full px-2.5 py-1">
                    {item.step}
                  </span>
                  <div className="text-brand-blue">{item.icon}</div>
                </div>
                <p className="font-semibold text-sm text-foreground">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value for Landlords */}
      <section
        id="for-landlords"
        className="py-16 md:py-24"
        style={{ backgroundColor: "oklch(var(--section-tint))" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            What this means for you
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Avoid bad tenants",
              "Reduce rent default risk",
              "Stop chasing payments",
              "Make your rental income more predictable",
            ].map((text) => (
              <div
                key={text}
                className="flex items-start gap-3 bg-white rounded-xl border border-border shadow-xs p-5"
              >
                <span className="mt-0.5 w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                  <CheckIcon />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenant teaser */}
      <section className="py-12 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Better for tenants too
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Good tenants get recognized. They build a trust profile that helps
            them access better homes faster — without unnecessary stress or
            suspicion.
          </p>
          <Link to="/tenant" data-ocid="tenant_teaser.learn_more.link">
            <Button
              variant="outline"
              className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue/5 text-sm px-5"
            >
              Learn more for tenants →
            </Button>
          </Link>
        </div>
      </section>

      {/* Early Access Form */}
      <EarlyAccessForm
        userType={UserType.landlord}
        showProperties
        title="Be among the first landlords using RentTrust"
        subtitle="We're rolling out to a small group of landlords first. Join early and help shape a better rental system."
        ctaLabel="Join Early Access"
      />
    </main>
  );
}

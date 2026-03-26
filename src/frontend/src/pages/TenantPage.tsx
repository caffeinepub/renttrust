import { EarlyAccessForm } from "@/components/shared/EarlyAccessForm";
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

export function TenantPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "oklch(var(--section-tint))" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue rounded-full px-3 py-1 text-xs font-semibold mb-6">
            <span>For Tenants</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight mb-5">
            Build your rental reputation.
            <br />
            Get access to better homes.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            RentTrust creates a verified profile that shows landlords
            you&apos;re reliable — so you can move faster and avoid unnecessary
            stress.
          </p>
        </div>
      </section>

      {/* How it works for tenants */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              How it works for tenants
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                step: "01",
                title: "Apply through RentTrust",
                desc: "Submit your details and start building your verified profile.",
              },
              {
                step: "02",
                title: "We verify your identity, income, and rental history",
                desc: "We run thorough but fair checks to build an accurate picture of you.",
              },
              {
                step: "03",
                title: "Get a RentTrust Score that opens doors",
                desc: "Your score travels with you, so landlords trust you before you even meet.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-border shadow-xs p-6 bg-white"
              >
                <span className="inline-block text-xs font-bold text-brand-blue bg-brand-blue/10 rounded-full px-2.5 py-1 mb-4">
                  {item.step}
                </span>
                <p className="font-semibold text-sm text-foreground mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "oklch(var(--section-tint))" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Why it matters
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Move into better homes faster",
              "No more being judged on appearances",
              "Your reliability follows you",
              "Landlords trust you from day one",
            ].map((text) => (
              <div
                key={text}
                className="flex items-start gap-3 bg-white rounded-xl border border-border shadow-xs p-5"
              >
                <span className="mt-0.5 w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
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

      {/* Early Access Form */}
      <EarlyAccessForm
        userType={UserType.tenant}
        showProperties={false}
        title="Get early access as a tenant"
        subtitle="Join early and be part of building a fairer rental system for everyone."
        ctaLabel="Join Early Access"
      />
    </main>
  );
}

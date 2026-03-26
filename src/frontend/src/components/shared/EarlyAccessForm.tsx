import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitSignup } from "@/hooks/useQueries";
import { useState } from "react";
import type { UserType } from "../../backend";

interface EarlyAccessFormProps {
  userType: UserType;
  showProperties?: boolean;
  ctaLabel?: string;
  title?: string;
  subtitle?: string;
}

export function EarlyAccessForm({
  userType,
  showProperties = true,
  ctaLabel = "Join Early Access",
  title = "Be among the first using RentTrust",
  subtitle = "We're rolling out to a small group first. Join early and help shape a better rental system.",
}: EarlyAccessFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfProperties: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitSignup = useSubmitSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitSignup.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userType,
        numberOfProperties: showProperties
          ? BigInt(formData.numberOfProperties || "0")
          : 0n,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="early-access"
      className="py-16 md:py-24"
      style={{ backgroundColor: "oklch(var(--section-tint))" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-border shadow-card p-8 md:p-12 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
          <div>
            {submitted ? (
              <div
                data-ocid="signup.success_state"
                className="text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
                  <svg
                    aria-hidden="true"
                    className="w-7 h-7"
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
                </div>
                <p className="font-bold text-foreground text-lg mb-1">
                  You&apos;re on the list.
                </p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="form-name"
                    className="text-xs font-medium text-foreground"
                  >
                    Name
                  </Label>
                  <Input
                    data-ocid="signup.name.input"
                    id="form-name"
                    type="text"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="h-10 text-sm border-border"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="form-phone"
                    className="text-xs font-medium text-foreground"
                  >
                    Phone
                  </Label>
                  <Input
                    data-ocid="signup.phone.input"
                    id="form-phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="h-10 text-sm border-border"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="form-email"
                    className="text-xs font-medium text-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    data-ocid="signup.email.input"
                    id="form-email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    className="h-10 text-sm border-border"
                  />
                </div>
                {showProperties && (
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="form-properties"
                      className="text-xs font-medium text-foreground"
                    >
                      Number of properties
                    </Label>
                    <Input
                      data-ocid="signup.num_properties.input"
                      id="form-properties"
                      type="number"
                      min={1}
                      placeholder="e.g. 3"
                      required
                      value={formData.numberOfProperties}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          numberOfProperties: e.target.value,
                        }))
                      }
                      className="h-10 text-sm border-border"
                    />
                  </div>
                )}
                <Button
                  data-ocid="signup.submit.button"
                  type="submit"
                  disabled={submitSignup.isPending}
                  className="w-full h-11 bg-brand-green hover:bg-brand-green/90 text-white rounded-full text-sm font-semibold mt-1"
                >
                  {submitSignup.isPending ? "Submitting..." : ctaLabel}
                </Button>
                {submitSignup.isError && (
                  <p
                    data-ocid="signup.error_state"
                    className="text-xs text-destructive text-center"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

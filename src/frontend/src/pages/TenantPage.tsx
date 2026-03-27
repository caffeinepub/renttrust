import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  FileText,
  Home,
  MessageSquare,
  TrendingUp,
  XCircle,
} from "lucide-react";

const SCORE = 78;
const SCORE_BREAKDOWN = [
  { label: "Income Stability", value: 80 },
  { label: "Rental History", value: 85 },
  { label: "Behavior", value: 70 },
  { label: "References", value: 75 },
];

const PAYMENTS = [
  { date: "Feb 1, 2026", amount: "₦85,000", onTime: true, label: "On time" },
  { date: "Jan 1, 2026", amount: "₦85,000", onTime: true, label: "On time" },
  {
    date: "Dec 1, 2025",
    amount: "₦85,000",
    onTime: false,
    label: "+3 days late",
  },
  { date: "Nov 1, 2025", amount: "₦85,000", onTime: true, label: "On time" },
  { date: "Oct 1, 2025", amount: "₦85,000", onTime: true, label: "On time" },
];

const NOTIFICATIONS = [
  {
    icon: Bell,
    color: "text-warning",
    bg: "bg-warning/10",
    text: "Rent due in 5 days",
    sub: "April 1, 2026",
  },
  {
    icon: FileText,
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
    text: "Agreement renewal in 30 days",
    sub: "May 1, 2026",
  },
  {
    icon: CheckCircle2,
    color: "text-destructive",
    bg: "bg-destructive/10",
    text: "ID verification required",
    sub: "Action needed",
  },
];

const TIPS = [
  {
    icon: Calendar,
    title: "Pay on time",
    desc: "Every on-time payment adds to your score and builds landlord trust.",
  },
  {
    icon: MessageSquare,
    title: "Communicate early",
    desc: "If you anticipate a delay, reach out before the due date. It counts.",
  },
  {
    icon: Home,
    title: "Maintain property",
    desc: "Reporting issues promptly and keeping the place in good shape reflects in your profile.",
  },
];

function scoreColor(score: number) {
  if (score >= 80) return "text-brand-green";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

function scoreFill(score: number) {
  if (score >= 80) return "bg-brand-green";
  if (score >= 60) return "bg-warning";
  return "bg-destructive";
}

export function TenantPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div
          data-ocid="tenant.dialog"
          className="bg-white rounded-3xl border border-border shadow-card p-10 max-w-sm w-full text-center"
        >
          <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-5">
            <svg
              aria-hidden="true"
              className="w-7 h-7 text-brand-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Tenant Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mb-7">
            Log in to access your dashboard.
          </p>
          <Button
            data-ocid="tenant.login.button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-full h-11 text-sm font-semibold"
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your rent, score, and tenancy profile in one place.
          </p>
        </div>

        {/* Rent Status Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div
            data-ocid="tenant.rent_due.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <p className="text-xs text-muted-foreground mb-1">Next Rent Due</p>
            <p className="text-base font-bold text-foreground leading-tight">
              April 1, 2026
            </p>
          </div>
          <div
            data-ocid="tenant.rent_amount.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <p className="text-xs text-muted-foreground mb-1">Monthly Rent</p>
            <p className="text-base font-bold text-foreground leading-tight">
              ₦85,000
            </p>
          </div>
          <div
            data-ocid="tenant.rent_status.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <Badge
              variant="outline"
              className="bg-brand-green/10 text-brand-green border-brand-green/20 text-xs mt-1"
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Paid
            </Badge>
          </div>
        </div>

        {/* RentTrust Score */}
        <div
          data-ocid="tenant.score.card"
          className="bg-white rounded-2xl border border-border shadow-xs p-6"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                RentTrust Score
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Based on your payment history and verified profile
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-brand-green/10 text-brand-green border-brand-green/20 text-xs"
            >
              Good
            </Badge>
          </div>
          <div className="flex items-end gap-4 mb-5">
            <span
              className={`text-6xl font-extrabold leading-none ${scoreColor(SCORE)}`}
            >
              {SCORE}
            </span>
            <span className="text-sm text-muted-foreground mb-2">/ 100</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Your score reflects consistent on-time payments and verified income.
            Keep it up.
          </p>
          <div className="flex flex-col gap-3">
            {SCORE_BREAKDOWN.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className={scoreColor(item.value)}>{item.value}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreFill(item.value)}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div
          data-ocid="tenant.payments.card"
          className="bg-white rounded-2xl border border-border shadow-xs p-6"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Payment History
          </h2>
          <div className="flex flex-col">
            {PAYMENTS.map((p) => (
              <div
                key={p.date}
                className="flex items-center gap-4 py-3 border-b border-border last:border-0"
              >
                <div className="flex flex-col items-center">
                  {p.onTime ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-green" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {p.date}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.amount}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${p.onTime ? "bg-brand-green/10 text-brand-green border-brand-green/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}
                >
                  {p.label}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement */}
        <div
          data-ocid="tenant.agreement.card"
          className="bg-white rounded-2xl border border-border shadow-xs p-6"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Rental Agreement
          </h2>
          <div className="bg-muted/40 rounded-xl p-4 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  17 Awolowo Rd, Ikoyi
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Apr 1, 2025 – Mar 31, 2026 · ₦85,000/month
                </p>
              </div>
              <Badge
                variant="outline"
                className="bg-brand-green/10 text-brand-green border-brand-green/20 text-xs"
              >
                Active
              </Badge>
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex flex-col gap-1 mb-4">
            <span>• 12-month lease</span>
            <span>• 30-day notice required to vacate</span>
            <span>• No subletting permitted</span>
          </div>
          <Button
            data-ocid="tenant.view_agreement.button"
            variant="outline"
            className="h-9 text-sm rounded-full gap-2"
          >
            <FileText className="w-4 h-4" />
            View Full Agreement
          </Button>
        </div>

        {/* Notifications */}
        <div
          data-ocid="tenant.notifications.card"
          className="bg-white rounded-2xl border border-border shadow-xs p-6"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Notifications
          </h2>
          <div className="flex flex-col gap-3">
            {NOTIFICATIONS.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.text}
                  data-ocid={`tenant.notification.item.${NOTIFICATIONS.indexOf(n) + 1}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${n.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {n.text}
                    </p>
                    <p className="text-xs text-muted-foreground">{n.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keep Score High Tips */}
        <div
          data-ocid="tenant.tips.card"
          className="bg-white rounded-2xl border border-border shadow-xs p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            <h2 className="text-sm font-semibold text-foreground">
              Keep Your Score High
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {TIPS.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {tip.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

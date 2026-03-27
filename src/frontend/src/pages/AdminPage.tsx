import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useGetAllSignups, useIsCallerAdmin } from "@/hooks/useQueries";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Save,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { UserType } from "../backend";

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

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

const VERIFICATION_QUEUE = [
  { name: "Chidi Okafor", status: "Pending" },
  { name: "Amaka Nwosu", status: "Verified" },
  { name: "Emeka Eze", status: "Rejected" },
  { name: "Bola Adeyemi", status: "Pending" },
];

const RISK_ALERTS = [
  { name: "Emeka Eze", detail: "21 days late — High Risk", severity: "high" },
  {
    name: "Tunde Fashola",
    detail: "Repeated late payments (3×)",
    severity: "high",
  },
  {
    name: "Ngozi Obi",
    detail: "Behavioural flag — neighbor complaint",
    severity: "medium",
  },
];

type VerificationStatus = "Pending" | "Verified" | "Rejected";

function verificationBadge(status: VerificationStatus) {
  if (status === "Verified")
    return "bg-brand-green/10 text-brand-green border-brand-green/20";
  if (status === "Rejected")
    return "bg-destructive/10 text-destructive border-destructive/20";
  return "bg-warning/10 text-warning border-warning/20";
}

function VerificationIcon({ status }: { status: VerificationStatus }) {
  if (status === "Verified") return <CheckCircle2 className="w-3 h-3 mr-1" />;
  if (status === "Rejected") return <XCircle className="w-3 h-3 mr-1" />;
  return <Clock className="w-3 h-3 mr-1" />;
}

export function AdminPage() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: signups, isLoading: isSignupsLoading } = useGetAllSignups();

  const [activeTab, setActiveTab] = useState("all");
  const [weights, setWeights] = useState({
    income: 30,
    behavior: 25,
    history: 30,
    references: 15,
  });
  const [weightsSaved, setWeightsSaved] = useState(false);

  const handleSaveWeights = () => {
    setWeightsSaved(true);
    setTimeout(() => setWeightsSaved(false), 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div
          data-ocid="admin.dialog"
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
            Admin Access
          </h2>
          <p className="text-sm text-muted-foreground mb-7">
            Log in to view early access signups.
          </p>
          <Button
            data-ocid="admin.login.button"
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

  if (isAdminLoading) {
    return (
      <div
        data-ocid="admin.loading_state"
        className="min-h-[70vh] flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-green border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div
          data-ocid="admin.error_state"
          className="bg-white rounded-3xl border border-border shadow-card p-10 max-w-sm w-full text-center"
        >
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5">
            <svg
              aria-hidden="true"
              className="w-7 h-7 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-muted-foreground mb-7">
            You don&apos;t have admin access.
          </p>
          <Button
            data-ocid="admin.logout.button"
            variant="outline"
            onClick={() => clear()}
            className="w-full rounded-full h-10 text-sm"
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }

  const landlordSignups = (signups ?? []).filter(
    (s) => s.userType === UserType.landlord,
  );
  const tenantSignups = (signups ?? []).filter(
    (s) => s.userType === UserType.tenant,
  );

  const filteredSignups =
    activeTab === "landlords"
      ? landlordSignups
      : activeTab === "tenants"
        ? tenantSignups
        : (signups ?? []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <HouseIcon className="w-9 h-9" />
          <div>
            <h1 className="text-xl font-bold text-foreground">RentTrust</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
        <Button
          data-ocid="admin.logout.button"
          variant="outline"
          onClick={() => clear()}
          className="rounded-full h-9 text-sm px-4"
        >
          Log Out
        </Button>
      </div>

      {/* Top Metrics — 5 cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-border shadow-xs p-5">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-brand-blue" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Total Tenants</p>
          {isSignupsLoading ? (
            <Skeleton className="h-7 w-12" />
          ) : (
            <p className="text-2xl font-bold text-foreground">
              {tenantSignups.length}
            </p>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-xs p-5">
          <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-brand-green" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Total Landlords</p>
          {isSignupsLoading ? (
            <Skeleton className="h-7 w-12" />
          ) : (
            <p className="text-2xl font-bold text-brand-green">
              {landlordSignups.length}
            </p>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-xs p-5">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-3">
            <RefreshCw className="w-4 h-4 text-brand-blue" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            Active Verifications
          </p>
          <p className="text-2xl font-bold text-brand-blue">14</p>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-xs p-5">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center mb-3">
            <ShieldAlert className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            High Risk Tenants
          </p>
          <p className="text-2xl font-bold text-destructive">3</p>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-xs p-5">
          <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Default Rate</p>
          <p className="text-2xl font-bold text-warning">4.2%</p>
        </div>
      </div>

      {/* Early Access Signups Table */}
      <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            Early Access Signups
          </h2>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-5 pt-4 pb-0 border-b border-border">
            <TabsList className="h-9 bg-muted rounded-lg">
              <TabsTrigger
                data-ocid="admin.all.tab"
                value="all"
                className="text-xs"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.landlords.tab"
                value="landlords"
                className="text-xs"
              >
                Landlords
              </TabsTrigger>
              <TabsTrigger
                data-ocid="admin.tenants.tab"
                value="tenants"
                className="text-xs"
              >
                Tenants
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={activeTab} className="m-0">
            {isSignupsLoading ? (
              <div
                data-ocid="admin.table.loading_state"
                className="p-8 flex flex-col gap-3"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={`skeleton-${i}`} className="h-10 w-full" />
                ))}
              </div>
            ) : filteredSignups.length === 0 ? (
              <div
                data-ocid="admin.table.empty_state"
                className="py-16 text-center"
              >
                <p className="text-sm text-muted-foreground">No signups yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead>Date Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSignups.map((signup, i) => (
                    <TableRow
                      key={`${signup.email}-${i}`}
                      data-ocid={`admin.table.row.${i + 1}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {signup.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {signup.email}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {signup.phone}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            signup.userType === UserType.landlord
                              ? "bg-brand-green/10 text-brand-green border-brand-green/20 text-xs"
                              : "bg-brand-blue/10 text-brand-blue border-brand-blue/20 text-xs"
                          }
                          variant="outline"
                        >
                          {signup.userType === UserType.landlord
                            ? "Landlord"
                            : "Tenant"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {signup.userType === UserType.landlord
                          ? Number(signup.numberOfProperties)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(signup.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Two-column: Verification Queue + Risk Monitoring */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* Verification Queue */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Verification Queue
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Tenant</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VERIFICATION_QUEUE.map((item, i) => (
                <TableRow
                  key={item.name}
                  data-ocid={`admin.verification.item.${i + 1}`}
                >
                  <TableCell className="text-sm font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${verificationBadge(item.status as VerificationStatus)}`}
                    >
                      <VerificationIcon
                        status={item.status as VerificationStatus}
                      />
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.status !== "Verified" ? (
                      <Button
                        data-ocid={`admin.verification.review.button.${i + 1}`}
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs px-3 rounded-lg"
                      >
                        Review
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Risk Monitoring */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Risk Monitoring
            </h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {RISK_ALERTS.map((alert, i) => (
              <div
                key={alert.name}
                data-ocid={`admin.risk.item.${i + 1}`}
                className={`flex gap-3 p-4 rounded-xl border-l-4 ${
                  alert.severity === "high"
                    ? "bg-destructive/5 border-destructive"
                    : "bg-warning/5 border-warning"
                }`}
              >
                <ShieldAlert
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    alert.severity === "high"
                      ? "text-destructive"
                      : "text-warning"
                  }`}
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {alert.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scoring Control Panel */}
      <div className="bg-white rounded-2xl border border-border shadow-xs p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Scoring Control Panel
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Adjust how each factor contributes to the RentTrust Score
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {[
            { key: "income" as const, label: "Income Weight" },
            { key: "behavior" as const, label: "Behavior Weight" },
            { key: "history" as const, label: "History Weight" },
            { key: "references" as const, label: "References Weight" },
          ].map((item) => (
            <div key={item.key}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
                <span className="text-brand-blue font-bold">
                  {weights[item.key]}%
                </span>
              </div>
              <Slider
                data-ocid={`admin.scoring.${item.key}.toggle`}
                value={[weights[item.key]]}
                onValueChange={([val]) =>
                  setWeights((prev) => ({ ...prev, [item.key]: val }))
                }
                min={5}
                max={60}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <Button
          data-ocid="admin.save_weights.button"
          onClick={handleSaveWeights}
          className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full h-9 px-5 text-sm font-semibold gap-2"
        >
          <Save className="w-4 h-4" />
          {weightsSaved ? "Saved!" : "Save Weights"}
        </Button>
      </div>
    </div>
  );
}

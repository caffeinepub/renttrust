import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  AlertTriangle,
  Bell,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Flag,
  Plus,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";

type RiskLevel = "Low" | "Medium" | "High";
type RentStatus = "Paid" | "Due" | "Late";

interface Tenant {
  id: number;
  name: string;
  score: number;
  risk: RiskLevel;
  status: RentStatus;
  daysLate: number;
  lastPayment: string;
  phone: string;
  property: string;
  rentAmount: string;
  moveIn: string;
  scoreBreakdown: { label: string; value: number }[];
  payments: { date: string; amount: string; delay: string }[];
  behaviorLog: { date: string; note: string }[];
  documents: { name: string; status: "Verified" | "Pending" }[];
}

const TENANTS: Tenant[] = [
  {
    id: 1,
    name: "Chidi Okafor",
    score: 87,
    risk: "Low",
    status: "Paid",
    daysLate: 0,
    lastPayment: "Mar 1, 2026",
    phone: "+234 801 234 5678",
    property: "12 Adewale Close, Lekki",
    rentAmount: "₦120,000/mo",
    moveIn: "Jan 15, 2025",
    scoreBreakdown: [
      { label: "Income Stability", value: 90 },
      { label: "Rental History", value: 88 },
      { label: "Behavior", value: 82 },
      { label: "References", value: 85 },
    ],
    payments: [
      { date: "Mar 1, 2026", amount: "₦120,000", delay: "On time" },
      { date: "Feb 1, 2026", amount: "₦120,000", delay: "On time" },
      { date: "Jan 1, 2026", amount: "₦120,000", delay: "+1 day" },
      { date: "Dec 1, 2025", amount: "₦120,000", delay: "On time" },
      { date: "Nov 1, 2025", amount: "₦120,000", delay: "On time" },
    ],
    behaviorLog: [
      { date: "Feb 10, 2026", note: "Responsive to messages" },
      { date: "Jan 5, 2026", note: "Reported maintenance issue promptly" },
      { date: "Nov 20, 2025", note: "Paid slightly late, communicated early" },
    ],
    documents: [
      { name: "ID Verification", status: "Verified" },
      { name: "Rental Agreement", status: "Verified" },
    ],
  },
  {
    id: 2,
    name: "Amaka Nwosu",
    score: 72,
    risk: "Medium",
    status: "Due",
    daysLate: 0,
    lastPayment: "Feb 1, 2026",
    phone: "+234 803 456 7890",
    property: "5 Marina Drive, VI",
    rentAmount: "₦95,000/mo",
    moveIn: "Apr 1, 2025",
    scoreBreakdown: [
      { label: "Income Stability", value: 70 },
      { label: "Rental History", value: 75 },
      { label: "Behavior", value: 68 },
      { label: "References", value: 72 },
    ],
    payments: [
      { date: "Feb 1, 2026", amount: "₦95,000", delay: "On time" },
      { date: "Jan 1, 2026", amount: "₦95,000", delay: "+2 days" },
      { date: "Dec 1, 2025", amount: "₦95,000", delay: "+5 days" },
      { date: "Nov 1, 2025", amount: "₦95,000", delay: "On time" },
    ],
    behaviorLog: [
      { date: "Jan 10, 2026", note: "Delayed payment, gave advance notice" },
      { date: "Dec 8, 2025", note: "Late again, cited work challenges" },
    ],
    documents: [
      { name: "ID Verification", status: "Verified" },
      { name: "Rental Agreement", status: "Verified" },
    ],
  },
  {
    id: 3,
    name: "Emeka Eze",
    score: 45,
    risk: "High",
    status: "Late",
    daysLate: 12,
    lastPayment: "Jan 20, 2026",
    phone: "+234 807 654 3210",
    property: "3 Bode Thomas, Surulere",
    rentAmount: "₦75,000/mo",
    moveIn: "Jun 1, 2024",
    scoreBreakdown: [
      { label: "Income Stability", value: 40 },
      { label: "Rental History", value: 50 },
      { label: "Behavior", value: 35 },
      { label: "References", value: 55 },
    ],
    payments: [
      { date: "Jan 20, 2026", amount: "₦75,000", delay: "+20 days" },
      { date: "Dec 15, 2025", amount: "₦75,000", delay: "+15 days" },
      { date: "Nov 18, 2025", amount: "₦75,000", delay: "+18 days" },
      { date: "Oct 5, 2025", amount: "₦75,000", delay: "+5 days" },
    ],
    behaviorLog: [
      { date: "Feb 5, 2026", note: "Delayed payment — not responding" },
      { date: "Jan 20, 2026", note: "Paid after 20 days" },
      { date: "Dec 15, 2025", note: "Multiple follow-ups needed" },
    ],
    documents: [
      { name: "ID Verification", status: "Verified" },
      { name: "Rental Agreement", status: "Pending" },
    ],
  },
  {
    id: 4,
    name: "Bola Adeyemi",
    score: 91,
    risk: "Low",
    status: "Paid",
    daysLate: 0,
    lastPayment: "Mar 3, 2026",
    phone: "+234 802 111 2222",
    property: "8 Ogba Estate, Ikeja",
    rentAmount: "₦85,000/mo",
    moveIn: "Mar 1, 2024",
    scoreBreakdown: [
      { label: "Income Stability", value: 95 },
      { label: "Rental History", value: 92 },
      { label: "Behavior", value: 88 },
      { label: "References", value: 90 },
    ],
    payments: [
      { date: "Mar 3, 2026", amount: "₦85,000", delay: "On time" },
      { date: "Feb 2, 2026", amount: "₦85,000", delay: "On time" },
      { date: "Jan 2, 2026", amount: "₦85,000", delay: "On time" },
      { date: "Dec 2, 2025", amount: "₦85,000", delay: "On time" },
      { date: "Nov 2, 2025", amount: "₦85,000", delay: "On time" },
    ],
    behaviorLog: [
      { date: "Feb 15, 2026", note: "Always pays early" },
      { date: "Jan 18, 2026", note: "Proactive about lease renewal" },
    ],
    documents: [
      { name: "ID Verification", status: "Verified" },
      { name: "Rental Agreement", status: "Verified" },
    ],
  },
  {
    id: 5,
    name: "Ngozi Obi",
    score: 63,
    risk: "Medium",
    status: "Due",
    daysLate: 3,
    lastPayment: "Feb 28, 2026",
    phone: "+234 805 999 8887",
    property: "17 Awolowo Rd, Ikoyi",
    rentAmount: "₦110,000/mo",
    moveIn: "Sep 15, 2024",
    scoreBreakdown: [
      { label: "Income Stability", value: 62 },
      { label: "Rental History", value: 65 },
      { label: "Behavior", value: 60 },
      { label: "References", value: 64 },
    ],
    payments: [
      { date: "Feb 28, 2026", amount: "₦110,000", delay: "+3 days" },
      { date: "Jan 30, 2026", amount: "₦110,000", delay: "+2 days" },
      { date: "Dec 29, 2025", amount: "₦110,000", delay: "On time" },
      { date: "Nov 29, 2025", amount: "₦110,000", delay: "+4 days" },
    ],
    behaviorLog: [
      { date: "Mar 3, 2026", note: "Behavioral flag — neighbor complaint" },
      { date: "Jan 31, 2026", note: "Paid slightly late" },
    ],
    documents: [
      { name: "ID Verification", status: "Verified" },
      { name: "Rental Agreement", status: "Verified" },
    ],
  },
  {
    id: 6,
    name: "Tunde Fashola",
    score: 38,
    risk: "High",
    status: "Late",
    daysLate: 21,
    lastPayment: "Jan 10, 2026",
    phone: "+234 809 333 4445",
    property: "22 Ladipo St, Mushin",
    rentAmount: "₦60,000/mo",
    moveIn: "Aug 1, 2024",
    scoreBreakdown: [
      { label: "Income Stability", value: 35 },
      { label: "Rental History", value: 40 },
      { label: "Behavior", value: 30 },
      { label: "References", value: 45 },
    ],
    payments: [
      { date: "Jan 10, 2026", amount: "₦60,000", delay: "+10 days" },
      { date: "Dec 12, 2025", amount: "₦60,000", delay: "+12 days" },
      { date: "Nov 14, 2025", amount: "₦60,000", delay: "+14 days" },
      { date: "Oct 9, 2025", amount: "₦60,000", delay: "+9 days" },
    ],
    behaviorLog: [
      { date: "Feb 28, 2026", note: "21 days overdue — no response" },
      { date: "Jan 10, 2026", note: "Repeated late payments (3rd time)" },
      { date: "Dec 12, 2025", note: "Ignored first two reminders" },
    ],
    documents: [
      { name: "ID Verification", status: "Pending" },
      { name: "Rental Agreement", status: "Verified" },
    ],
  },
];

function scoreColor(score: number) {
  if (score >= 80) return "text-brand-green";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

function scoreBg(score: number) {
  if (score >= 80) return "bg-brand-green";
  if (score >= 60) return "bg-warning";
  return "bg-destructive";
}

function riskBadge(risk: RiskLevel) {
  if (risk === "Low")
    return "bg-brand-green/10 text-brand-green border-brand-green/20";
  if (risk === "Medium") return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

function statusBadge(status: RentStatus) {
  if (status === "Paid")
    return "bg-brand-green/10 text-brand-green border-brand-green/20";
  if (status === "Due")
    return "bg-brand-blue/10 text-brand-blue border-brand-blue/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

function TenantProfileModal({
  tenant,
  onClose,
}: { tenant: Tenant; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="landlord.tenant_profile.dialog"
        className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{tenant.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full justify-start mb-4 h-9 bg-muted rounded-lg overflow-x-auto">
              <TabsTrigger
                data-ocid="landlord.profile.info.tab"
                value="info"
                className="text-xs"
              >
                Info
              </TabsTrigger>
              <TabsTrigger
                data-ocid="landlord.profile.score.tab"
                value="score"
                className="text-xs"
              >
                Score
              </TabsTrigger>
              <TabsTrigger
                data-ocid="landlord.profile.payments.tab"
                value="payments"
                className="text-xs"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                data-ocid="landlord.profile.behavior.tab"
                value="behavior"
                className="text-xs"
              >
                Behavior
              </TabsTrigger>
              <TabsTrigger
                data-ocid="landlord.profile.docs.tab"
                value="docs"
                className="text-xs"
              >
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="px-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: tenant.name },
                  { label: "Phone", value: tenant.phone },
                  { label: "Property", value: tenant.property },
                  { label: "Rent Amount", value: tenant.rentAmount },
                  { label: "Move-in Date", value: tenant.moveIn },
                ].map((row) => (
                  <div key={row.label} className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {row.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="score" className="px-1">
              <div className="text-center mb-6">
                <div
                  className={`text-6xl font-extrabold ${scoreColor(tenant.score)}`}
                >
                  {tenant.score}
                </div>
                <p className="text-sm text-muted-foreground mt-1">out of 100</p>
              </div>
              <div className="flex flex-col gap-4">
                {tenant.scoreBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground font-medium">
                        {item.label}
                      </span>
                      <span className={scoreColor(item.value)}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreBg(item.value)}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="px-1">
              <div className="flex flex-col gap-3">
                {tenant.payments.map((p) => (
                  <div
                    key={p.date}
                    className="flex items-center justify-between border border-border rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {p.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.amount}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        p.delay === "On time"
                          ? "bg-brand-green/10 text-brand-green border-brand-green/20 text-xs"
                          : "bg-destructive/10 text-destructive border-destructive/20 text-xs"
                      }
                    >
                      {p.delay}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="px-1">
              <div className="flex flex-col gap-3">
                {tenant.behaviorLog.map((log) => (
                  <div
                    key={log.date}
                    className="flex gap-3 border border-border rounded-xl px-4 py-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {log.date}
                      </p>
                      <p className="text-sm text-foreground">{log.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="docs" className="px-1">
              <div className="flex flex-col gap-3">
                {tenant.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between border border-border rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {doc.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "Verified"
                            ? "bg-brand-green/10 text-brand-green border-brand-green/20 text-xs"
                            : "bg-warning/10 text-warning border-warning/20 text-xs"
                        }
                      >
                        {doc.status === "Verified" ? (
                          <ShieldCheck className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {doc.status}
                      </Badge>
                      {doc.status === "Verified" && (
                        <Button
                          data-ocid="landlord.profile.doc.button"
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs px-3 rounded-lg"
                        >
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function LandlordPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div
          data-ocid="landlord.dialog"
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
            Landlord Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mb-7">
            Log in to access your dashboard.
          </p>
          <Button
            data-ocid="landlord.login.button"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Landlord Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor tenants, track rent, and assess risk across your portfolio.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            data-ocid="landlord.total_properties.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-brand-green" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground mt-1">
              Total Properties
            </p>
          </div>
          <div
            data-ocid="landlord.active_tenants.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-brand-blue" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">23</p>
            <p className="text-xs text-muted-foreground mt-1">Active Tenants</p>
          </div>
          <div
            data-ocid="landlord.rent_due.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-brand-green" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">₦2.4M</p>
            <p className="text-xs text-muted-foreground mt-1">
              Rent Due This Month
            </p>
          </div>
          <div
            data-ocid="landlord.late_payments.card"
            className="bg-white rounded-2xl border border-border shadow-xs p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
            </div>
            <p className="text-2xl font-bold text-destructive">3</p>
            <p className="text-xs text-muted-foreground mt-1">Late Payments</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            data-ocid="landlord.add_tenant.button"
            className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full h-9 px-4 text-sm font-semibold gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Tenant
          </Button>
          <Button
            data-ocid="landlord.send_reminder.button"
            variant="outline"
            className="rounded-full h-9 px-4 text-sm gap-2"
          >
            <Bell className="w-4 h-4" />
            Send Reminder
          </Button>
          <Button
            data-ocid="landlord.flag_issue.button"
            variant="outline"
            className="rounded-full h-9 px-4 text-sm gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            <Flag className="w-4 h-4" />
            Flag Issue
          </Button>
        </div>

        {/* Tenant Table */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Tenant Overview
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs font-semibold">
                    Tenant Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    RentTrust Score
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Risk Level
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Rent Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Days Late
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Last Payment
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TENANTS.map((tenant, i) => (
                  <TableRow
                    key={tenant.id}
                    data-ocid={`landlord.tenant.item.${i + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      {tenant.name}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-sm font-bold ${scoreColor(tenant.score)}`}
                      >
                        {tenant.score}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${riskBadge(tenant.risk)}`}
                      >
                        {tenant.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${statusBadge(tenant.status)}`}
                      >
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tenant.daysLate > 0 ? (
                        <span className="text-destructive font-medium">
                          {tenant.daysLate}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tenant.lastPayment}
                    </TableCell>
                    <TableCell>
                      <Button
                        data-ocid={`landlord.view_profile.button.${i + 1}`}
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedTenant(tenant)}
                        className="h-7 text-xs px-3 rounded-lg"
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {selectedTenant && (
        <TenantProfileModal
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </main>
  );
}

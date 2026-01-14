import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Building2,
  Users,
  CreditCard,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Boarding Houses" },
  { value: "10K+", label: "Boarders Managed" },
  { value: "₱50M+", label: "Payments Processed" },
  { value: "99.9%", label: "Uptime" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: Utility Tracking Now Available
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Manage Your{" "}
                <span className="text-gradient">Boarding House</span> with Ease
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                The all-in-one platform for landlords to manage rooms, track
                payments, monitor utilities, and keep boarders happy. Simplify
                your operations today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative lg:pl-8">
            <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
              {/* Mock Dashboard Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">
                  dashboard.bhms.app
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-primary/10 space-y-1">
                    <Building2 className="h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Total Rooms</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 space-y-1">
                    <Users className="h-5 w-5 text-emerald-500" />
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-xs text-muted-foreground">Boarders</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 space-y-1">
                    <CreditCard className="h-5 w-5 text-amber-500" />
                    <p className="text-2xl font-bold">₱85K</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 rounded-xl bg-muted/50 flex items-end justify-around px-4 pb-4">
                  {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                    <div
                      key={i}
                      className="w-6 bg-primary/60 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent Activity</p>
                  {[
                    { text: "Payment received from Room 301", time: "2m ago" },
                    { text: "New boarder registered", time: "1h ago" },
                    { text: "Utility reading updated", time: "3h ago" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/30"
                    >
                      <span className="text-muted-foreground">{item.text}</span>
                      <span className="text-muted-foreground/60">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-card border shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-medium">Payment Received</p>
                  <p className="text-xs text-muted-foreground">₱5,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-10 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

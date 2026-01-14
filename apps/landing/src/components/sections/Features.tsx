import {
  Building2,
  Users,
  CreditCard,
  Zap,
  BarChart3,
  FileText,
  Shield,
  Bell,
  Smartphone,
  Clock,
  Globe,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Building2,
    title: "Room Management",
    description:
      "Create, organize, and track room availability with detailed floor plans and amenity listings.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Boarder Profiles",
    description:
      "Maintain comprehensive boarder records with contact info, documents, and room assignments.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: CreditCard,
    title: "Payment Tracking",
    description:
      "Record payments, generate receipts, and monitor overdue balances with automated reminders.",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "Utility Monitoring",
    description:
      "Track electricity, water, and internet usage per room with automatic billing calculations.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Visualize occupancy rates, revenue trends, and payment statistics at a glance.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: FileText,
    title: "Report Generation",
    description:
      "Generate financial reports, occupancy summaries, and export data for accounting.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Secure Access",
    description:
      "Role-based access control with secure authentication for landlords and boarders.",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Automated alerts for due payments, lease expirations, and maintenance requests.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Access your dashboard anywhere with our responsive design and mobile app.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description:
      "Instant synchronization across all devices with optimistic UI updates.",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    icon: Globe,
    title: "Multi-property Support",
    description:
      "Manage multiple boarding houses from a single dashboard with ease.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: HeartHandshake,
    title: "Boarder Portal",
    description:
      "Give boarders access to view their payments, room details, and submit requests.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary mb-2">FEATURES</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to Manage Your Property
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed specifically for boarding house owners.
            Streamline operations and focus on what matters most.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

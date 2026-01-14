import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Award, Rocket } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We're committed to making property management accessible and efficient for everyone.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear pricing, honest communication, and no hidden fees. What you see is what you get.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every feature we build starts with understanding our customers' real needs.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We're building more than software—we're building a community of successful landlords.",
  },
];

const team = [
  { name: "Alex Rivera", role: "CEO & Founder", avatar: "AR" },
  { name: "Sarah Chen", role: "CTO", avatar: "SC" },
  { name: "Miguel Santos", role: "Head of Product", avatar: "MS" },
  { name: "Lisa Park", role: "Head of Customer Success", avatar: "LP" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary mb-2">ABOUT US</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Making Property Management Simple
            </h1>
            <p className="text-lg text-muted-foreground">
              We started BHMS because we saw landlords struggling with
              spreadsheets, paper receipts, and manual tracking. There had to be
              a better way.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  BHMS was born in 2023 when our founder, a boarding house owner
                  himself, realized that managing multiple properties with
                  spreadsheets was unsustainable.
                </p>
                <p>
                  After trying various property management solutions that were
                  either too complex or too expensive for small-scale landlords,
                  we decided to build something different.
                </p>
                <p>
                  Today, BHMS helps hundreds of property owners across the
                  Philippines manage their boarding houses efficiently, saving
                  them time and helping them grow their businesses.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">
                  Properties Managed
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Boarders</p>
              </Card>
              <Card className="p-6 text-center">
                <Rocket className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">4.9/5</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at BHMS.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind BHMS.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

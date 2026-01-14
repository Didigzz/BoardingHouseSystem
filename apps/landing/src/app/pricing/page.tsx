import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const comparisonFeatures = [
  {
    feature: "Number of Rooms",
    starter: "Up to 10",
    professional: "Up to 50",
    enterprise: "Unlimited",
  },
  {
    feature: "Number of Boarders",
    starter: "Up to 20",
    professional: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Payment Tracking",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Utility Tracking",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Basic Reports",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Advanced Analytics",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Automated Reminders",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Multi-property Support",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: "Custom Branding",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "API Access",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: "Email Support",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Priority Support",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Dedicated Account Manager",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: "SLA Guarantee",
    starter: false,
    professional: false,
    enterprise: true,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pb-8 pt-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold text-primary">PRICING</p>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Start with a 14-day free trial. No credit card required. Upgrade,
              downgrade, or cancel anytime.
            </p>
          </div>
        </div>
      </section>

      <Pricing />

      {/* Comparison Table */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Compare Plans</h2>
            <p className="text-lg text-muted-foreground">
              See all features side by side
            </p>
          </div>

          <Card className="mx-auto max-w-5xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">Starter</th>
                    <th className="bg-primary/5 p-4 text-center font-semibold">
                      Professional
                    </th>
                    <th className="p-4 text-center font-semibold">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row) => (
                    <tr key={row.feature} className="border-b last:border-0">
                      <td className="p-4 text-sm">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <Check className="mx-auto h-5 w-5 text-primary" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          )
                        ) : (
                          <span className="text-sm">{row.starter}</span>
                        )}
                      </td>
                      <td className="bg-primary/5 p-4 text-center">
                        {typeof row.professional === "boolean" ? (
                          row.professional ? (
                            <Check className="mx-auto h-5 w-5 text-primary" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          )
                        ) : (
                          <span className="text-sm">{row.professional}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <Check className="mx-auto h-5 w-5 text-primary" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          )
                        ) : (
                          <span className="text-sm">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Card, CardContent } from "@/components/ui/card";
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
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary mb-2">PRICING</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-lg text-muted-foreground">
              See all features side by side
            </p>
          </div>

          <Card className="overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold bg-primary/5">
                      Professional
                    </th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={row.feature} className="border-b last:border-0">
                      <td className="p-4 text-sm">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{row.starter}</span>
                        )}
                      </td>
                      <td className="p-4 text-center bg-primary/5">
                        {typeof row.professional === "boolean" ? (
                          row.professional ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm">{row.professional}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
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

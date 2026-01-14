import { UserPlus, Building, CreditCard, BarChart } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in seconds and set up your boarding house profile with basic information.",
  },
  {
    step: "02",
    icon: Building,
    title: "Add Your Rooms",
    description:
      "Configure your rooms with details like capacity, monthly rates, and available amenities.",
  },
  {
    step: "03",
    icon: CreditCard,
    title: "Register Boarders",
    description:
      "Add boarders to rooms, set up payment schedules, and track their information.",
  },
  {
    step: "04",
    icon: BarChart,
    title: "Track & Grow",
    description:
      "Monitor payments, utilities, and occupancy. Use insights to optimize your business.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary mb-2">HOW IT WORKS</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-muted-foreground">
            Our simple onboarding process gets you up and running quickly so you
            can focus on managing your property.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-primary/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

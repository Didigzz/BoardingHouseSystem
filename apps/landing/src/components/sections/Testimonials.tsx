import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Property Owner, Manila",
    content:
      "BHMS transformed how I manage my 3 boarding houses. Payment tracking alone saved me hours every week. The automated reminders mean I rarely have to chase late payments anymore.",
    rating: 5,
    avatar: "MS",
  },
  {
    name: "Juan dela Cruz",
    role: "Landlord, Cebu City",
    content:
      "The utility tracking feature is a game-changer. I can now accurately bill each room for their electricity and water usage. My boarders appreciate the transparency.",
    rating: 5,
    avatar: "JC",
  },
  {
    name: "Ana Reyes",
    role: "Property Manager, Davao",
    content:
      "As someone managing properties for multiple owners, the multi-property support is essential. The dashboard gives me a clear overview of all properties at once.",
    rating: 5,
    avatar: "AR",
  },
  {
    name: "Roberto Lim",
    role: "Boarding House Owner, Quezon City",
    content:
      "I was skeptical at first, but the free trial convinced me. The system is intuitive and my staff learned it quickly. Customer support has been excellent too.",
    rating: 5,
    avatar: "RL",
  },
  {
    name: "Carmen Villanueva",
    role: "Real Estate Investor, Makati",
    content:
      "The analytics dashboard helps me make data-driven decisions. I can see occupancy trends and revenue patterns that I never had visibility into before.",
    rating: 5,
    avatar: "CV",
  },
  {
    name: "Pedro Garcia",
    role: "Dormitory Manager, Baguio",
    content:
      "Managing a student dormitory with 50+ rooms was chaotic before BHMS. Now everything is organized and I can focus on providing better service to my tenants.",
    rating: 5,
    avatar: "PG",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-sm font-semibold text-primary">
            TESTIMONIALS
          </p>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Loved by Property Owners
          </h2>
          <p className="text-lg text-muted-foreground">
            See what landlords and property managers are saying about BHMS.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/20" />

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="mb-6 text-muted-foreground">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

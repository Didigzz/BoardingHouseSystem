import Link from "next/link";
import { Button } from "@havenspace/shared/ui";
import {
  Home,
  Users,
  CreditCard,
  BarChart3,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function BecomeLandlordPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="from-primary/5 via-primary/10 to-background relative overflow-hidden bg-gradient-to-br py-20 lg:py-32">
        <div className="relative container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
              <Building2 className="mr-2 h-4 w-4" />
              Join 500+ Landlords
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              List Your <span className="text-primary">Boarding House</span>{" "}
              With Us
            </h1>
            <p className="text-muted-foreground mt-6 text-lg sm:text-xl">
              Reach thousands of potential tenants, manage your properties
              efficiently, and grow your rental business with our comprehensive
              platform.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/register?role=landlord">
                <Button size="lg" className="gap-2">
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why List With Us?</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              Our platform provides everything you need to manage your boarding
              house business efficiently
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Reach More Tenants</h3>
              <p className="text-muted-foreground mt-2">
                Get your listings in front of thousands of potential boarders
                actively searching for accommodation.
              </p>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <CreditCard className="text-primary h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Online Payments</h3>
              <p className="text-muted-foreground mt-2">
                Accept rent payments online and track all transactions in one
                place. Say goodbye to manual collection.
              </p>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <BarChart3 className="text-primary h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Analytics Dashboard
              </h3>
              <p className="text-muted-foreground mt-2">
                Track occupancy rates, income, and expenses with detailed
                reports and insights.
              </p>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <MessageSquare className="text-primary h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Built-in Messaging</h3>
              <p className="text-muted-foreground mt-2">
                Communicate with tenants directly through our platform. Keep all
                conversations organized.
              </p>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <FileText className="text-primary h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Easy Management</h3>
              <p className="text-muted-foreground mt-2">
                Manage rooms, tenants, utility bills, and maintenance requests
                all from one dashboard.
              </p>
            </div>

            <div className="bg-card rounded-xl border p-6">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Verified Tenants</h3>
              <p className="text-muted-foreground mt-2">
                All boarders on our platform are verified, giving you peace of
                mind when accepting new tenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted/40 py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-4">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold">Apply</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Fill out the landlord application form with your details and
                property information.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold">Get Verified</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Our team reviews your application and verifies your identity and
                property ownership.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold">Create Listings</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Once approved, add your boarding house details, photos, and room
                information.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                4
              </div>
              <h3 className="mt-4 font-semibold">Start Earning</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Receive booking requests and start managing your rentals through
                our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Requirements</h2>
              <p className="text-muted-foreground mt-4">
                To become a landlord on our platform, you'll need to provide the
                following:
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <span className="font-medium">Valid Government ID</span>
                    <p className="text-muted-foreground text-sm">
                      Any valid government-issued identification document
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <span className="font-medium">
                      Proof of Property Ownership
                    </span>
                    <p className="text-muted-foreground text-sm">
                      Land title, lease agreement, or authorization letter
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <span className="font-medium">
                      Business Permit (Optional)
                    </span>
                    <p className="text-muted-foreground text-sm">
                      Required for commercial boarding houses
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <span className="font-medium">Property Photos</span>
                    <p className="text-muted-foreground text-sm">
                      Clear photos of the property, rooms, and amenities
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border p-8">
              <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
              <p className="text-muted-foreground mt-2">
                Join hundreds of successful landlords who trust our platform to
                manage their boarding houses.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-primary h-5 w-5" />
                  <span className="text-sm">
                    Application review takes 1-3 business days
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-primary h-5 w-5" />
                  <span className="text-sm">
                    Your information is secure and confidential
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span className="text-sm">
                    Free to list your first property
                  </span>
                </div>
              </div>
              <Link href="/register?role=landlord" className="mt-6 block">
                <Button size="lg" className="w-full gap-2">
                  Apply to Become a Landlord
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-muted/40 py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold">How much does it cost to list?</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Listing your boarding house is free. We only charge a small
                commission when you receive a booking through our platform.
              </p>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold">How long does approval take?</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Most applications are reviewed within 1-3 business days. You'll
                receive an email notification once approved.
              </p>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold">Can I list multiple properties?</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Yes! Once approved, you can list as many boarding houses as you
                own or manage.
              </p>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold">How do I receive payments?</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Payments are processed through our secure platform and
                transferred directly to your linked bank account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

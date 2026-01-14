"use client";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    value: "support@bhms.app",
    action: "mailto:support@bhms.app",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 8am to 6pm",
    value: "+63 (2) 8123-4567",
    action: "tel:+6328123456",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello at our office",
    value: "BGC, Taguig City, Philippines",
    action: "#",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available during business hours",
    value: "Start a conversation",
    action: "#",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-muted/30 pb-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold text-primary">CONTACT</p>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <Card key={method.title} className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-semibold">{method.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <a
                    href={method.action}
                    className="text-sm text-primary hover:underline"
                  >
                    {method.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Phone (Optional)
                    </label>
                    <Input type="tel" placeholder="+63 9XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold">
                  Frequently Asked Questions
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Before reaching out, you might find your answer in our FAQ
                  section.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/#faq">View FAQ</Link>
                </Button>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday
                    </span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Philippine Standard Time (PST)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">For Enterprise</h3>
                <p className="mb-4 text-muted-foreground">
                  Looking for a custom solution for your large-scale operation?
                  Our enterprise team is ready to help.
                </p>
                <Badge variant="secondary" className="mb-4">
                  Dedicated Support
                </Badge>
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href="mailto:enterprise@bhms.app"
                    className="text-primary hover:underline"
                  >
                    enterprise@bhms.app
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

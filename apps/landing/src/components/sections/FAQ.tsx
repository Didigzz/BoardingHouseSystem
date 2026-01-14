"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "You get full access to all features of your chosen plan for 14 days. No credit card is required to start. At the end of the trial, you can choose to subscribe or your account will be downgraded to a limited free tier.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption for all data in transit and at rest. Our servers are hosted on secure cloud infrastructure with regular backups. We never share your data with third parties.",
  },
  {
    question: "Can boarders access the system?",
    answer:
      "Yes! Boarders can log in using a simple access code to view their room details, payment history, and submit maintenance requests. They have limited access and cannot see other boarders' information.",
  },
  {
    question: "How does utility tracking work?",
    answer:
      "You can record meter readings for electricity, water, and other utilities per room. The system automatically calculates consumption and generates bills based on your configured rates. You can also set up sub-metering for individual rooms.",
  },
  {
    question: "Can I manage multiple properties?",
    answer:
      "Yes, our Professional and Enterprise plans support multiple properties. You can switch between properties from a single dashboard and view consolidated reports across all your boarding houses.",
  },
  {
    question: "Do you offer mobile apps?",
    answer:
      "Our web application is fully responsive and works great on mobile devices. Native iOS and Android apps are currently in development and will be available soon for Professional and Enterprise users.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, GCash, Maya, and bank transfers. For Enterprise plans, we also offer invoice-based billing with NET 30 terms.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes, you can export all your data including boarder records, payment history, and reports in CSV or PDF format. Enterprise users also have API access for custom integrations.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Starter plans include email support with 24-48 hour response time. Professional plans get priority support with same-day responses. Enterprise plans include a dedicated account manager and phone support.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're
            looking for, feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

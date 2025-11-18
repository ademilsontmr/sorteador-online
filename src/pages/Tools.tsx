import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { tools } from "@/data/tools";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Tools = () => {
  const faqs = [
    {
      category: "General",
      question: "Are AllWheel tools free to use?",
      answer:
        "Yes, all AllWheel tools are completely free to use. There are no signups, no subscriptions, and no hidden fees. All tools run entirely client-side in your browser.",
    },
    {
      category: "General",
      question: "Do I need to create an account?",
      answer:
        "No account is required. All tools work immediately without any registration. Simply visit the tool page and start using it right away.",
    },
    {
      category: "General",
      question: "Is my data stored or shared?",
      answer:
        "No. All data processing happens entirely in your browser. We don't collect, store, or transmit any of your input data to our servers. Your privacy is protected.",
    },
    {
      category: "General",
      question: "How does AllWheel ensure fair randomness?",
      answer:
        "AllWheel uses the browser's Web Crypto API (crypto.getRandomValues) with rejection sampling to avoid modulo bias. This provides cryptographically secure randomness that runs entirely client-side.",
    },
    {
      category: "Wheel Spinner",
      question: "How many items can I add to the wheel?",
      answer:
        "You can add unlimited items to the wheel spinner. There's no limit on the number of options you can include in your wheel.",
    },
    {
      category: "Wheel Spinner",
      question: "Can I remove a winner after spinning?",
      answer:
        "Yes. Enable the \"Remove winner after spin\" option to automatically remove the selected item from the wheel after each spin. This ensures each item can only be selected once.",
    },
    {
      category: "Wheel Spinner",
      question: "Does the wheel support sound effects and animations?",
      answer:
        "Yes. The wheel spinner includes sound effects and confetti animations to make the selection process more engaging and exciting.",
    },
    {
      category: "Wheel Spinner",
      question: "Can I customize the wheel colors?",
      answer:
        "The wheel automatically assigns colors to each segment. You can add custom labels and the wheel will display them clearly with distinct colors for each option.",
    },
    {
      category: "Number Generator",
      question: "What randomness method does the number generator use?",
      answer:
        "The number generator uses the browser's Web Crypto API (crypto.getRandomValues) with rejection sampling to avoid modulo bias. Everything runs client-side for maximum security and privacy.",
    },
    {
      category: "Number Generator",
      question: "Can I prevent duplicate numbers?",
      answer:
        "Yes. Disable the \"Allow duplicates\" switch to generate unique numbers without repetition. The tool will warn you if the quantity exceeds the available range size.",
    },
    {
      category: "Number Generator",
      question: "What's the maximum range I can use?",
      answer:
        "We recommend staying under 100,000 numbers for optimal performance. For larger ranges, you can run multiple batches or contact us for assistance.",
    },
    {
      category: "Number Generator",
      question: "Can I generate multiple numbers at once?",
      answer:
        "Yes. Set the quantity field to generate multiple numbers in a single draw. You can choose whether to allow duplicates or ensure all numbers are unique.",
    },
    {
      category: "Name Picker",
      question: "How do I add names to the picker?",
      answer:
        "Simply paste your list of names into the text area, with one name per line. The tool will automatically process and prepare them for selection.",
    },
    {
      category: "Name Picker",
      question: "Can I pick multiple names at once?",
      answer:
        "Yes. Set the quantity field to select multiple names in a single draw. Each name will be selected fairly and randomly.",
    },
    {
      category: "Name Picker",
      question: "Does the name picker work offline?",
      answer:
        "Yes. The name picker runs fully client-side, so once the page is loaded, you can continue using it even without an internet connection. Perfect for classrooms with patchy Wi-Fi.",
    },
    {
      category: "Name Picker",
      question: "Can I see a history of previous picks?",
      answer:
        "Yes. The name picker maintains a history of the last 10 draws, showing which names were selected and when. You can expand each entry to see full details.",
    },
    {
      category: "All Tools",
      question: "Do the tools work on mobile devices?",
      answer:
        "Yes. All AllWheel tools are fully responsive and work seamlessly on desktop, tablet, and mobile devices. The interface adapts to your screen size automatically.",
    },
    {
      category: "All Tools",
      question: "Can I export or save my results?",
      answer:
        "Results are stored locally in your browser's history. You can copy the results manually or use the history feature to review past selections. Export functionality is coming soon.",
    },
    {
      category: "All Tools",
      question: "Are the tools suitable for official giveaways and contests?",
      answer:
        "Yes. AllWheel tools use cryptographically secure randomness and provide transparent, verifiable results. They're suitable for official giveaways, contests, and fair selection processes.",
    },
    {
      category: "All Tools",
      question: "What browsers are supported?",
      answer:
        "AllWheel tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. JavaScript must be enabled for the tools to function properly.",
    },
  ];

  return (
    <>
      <SEO
        title="Free Random Selection Tools - Wheel Spinner, Number Generator, Name Picker | AllWheel"
        description="Access all free random selection tools: wheel spinner, number generator, and name picker. Fair, secure, and transparent random selection for giveaways, games, and activities."
        canonical="https://allwheel.click/tools"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Free Random Selection Tools
                </h1>
                <p className="text-lg text-muted-foreground">
                  Fair, secure, and transparent random selection tools for giveaways, games, decisions, and activities.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {tools.map((tool, index) => (
                  <Card
                    key={tool.id}
                    className="flex flex-col p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl ${tool.iconBgClass} flex items-center justify-center mb-5 shadow-glow`}
                    >
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <ul className="space-y-2 mb-6 text-sm flex-1">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${tool.bulletClass}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="mt-auto font-semibold" asChild>
                      <Link to={tool.path}>
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-background border-t border-border/60 py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
              <header>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
                <h2 className="text-3xl font-bold mt-2 mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Find answers to common questions about AllWheel tools and how to use them effectively.
                </p>
              </header>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={`${faq.category}-${index}`}
                    value={`faq-${index}`}
                    className="border border-border/70 rounded-2xl px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex items-start gap-3 w-full pr-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs uppercase tracking-wide text-primary bg-primary/10 font-semibold flex-shrink-0 mt-0.5">
                          {faq.category}
                        </span>
                        <span className="text-base font-semibold text-foreground flex-1 text-left">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Tools;


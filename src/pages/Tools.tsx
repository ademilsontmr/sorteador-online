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
        "Yes, all AllWheel tools are completely free to use with no limitations. There are no signups required, no subscriptions, no hidden fees, and no premium tiers. All tools run entirely client-side in your browser, which means you can use them as much as you want without any restrictions. Whether you're running a single giveaway or conducting hundreds of random selections, everything is free and accessible to everyone.",
    },
    {
      category: "General",
      question: "Do I need to create an account?",
      answer:
        "No account is required whatsoever. All tools work immediately without any registration, email verification, or login process. Simply visit the tool page and start using it right away. This makes AllWheel perfect for quick decisions, impromptu activities, or situations where you need instant access without any setup time. Your privacy is protected because we don't need any personal information to provide our services.",
    },
    {
      category: "General",
      question: "Is my data stored or shared?",
      answer:
        "No, your data is never stored or shared. All data processing happens entirely in your browser using client-side JavaScript. We don't collect, store, or transmit any of your input data to our servers. This means your names, numbers, options, and selections remain completely private on your device. The only storage that occurs is in your browser's local storage for features like history, which you can clear at any time. Your privacy is our priority, and we've designed AllWheel to respect it completely.",
    },
    {
      category: "General",
      question: "How does AllWheel ensure fair randomness?",
      answer:
        "AllWheel uses the browser's Web Crypto API (crypto.getRandomValues) combined with rejection sampling to avoid modulo bias. This provides cryptographically secure randomness that draws entropy from your operating system's hardware sources like mouse movements, keyboard timings, and thermal noise. The randomness runs entirely client-side, ensuring that each selection is truly unpredictable and fair. This method is the same standard used by security professionals and is suitable for official giveaways, contests, and any scenario requiring verifiable fairness.",
    },
    {
      category: "Wheel Spinner",
      question: "How many items can I add to the wheel?",
      answer:
        "You can add unlimited items to the wheel spinner. There's no limit on the number of options you can include in your wheel, whether you need 5 items or 500. The wheel automatically adjusts to accommodate any number of segments, and each item gets equal probability of being selected. This makes it perfect for everything from simple 2-option decisions to complex giveaways with hundreds of participants. The visual design scales beautifully regardless of how many items you add.",
    },
    {
      category: "Wheel Spinner",
      question: "Can I remove a winner after spinning?",
      answer:
        "Yes, absolutely. Enable the \"Remove winner after spin\" option in the wheel controls to automatically remove the selected item from the wheel after each spin. This ensures each item can only be selected once, which is perfect for giveaways, contests, or any scenario where you need to ensure fair distribution. Once an item is removed, it won't appear in subsequent spins until you manually add it back. This feature helps maintain fairness and prevents the same option from being selected multiple times.",
    },
    {
      category: "Wheel Spinner",
      question: "Does the wheel support sound effects and animations?",
      answer:
        "Yes, the wheel spinner includes optional sound effects and confetti animations to make the selection process more engaging and exciting. You can toggle these features on or off based on your preferences. The sound effects add audio feedback when the wheel spins and stops, while the confetti animation creates a celebratory visual effect when a winner is selected. These features are perfect for live streams, classroom activities, or any situation where you want to add extra excitement to the selection process. All effects run locally in your browser.",
    },
    {
      category: "Wheel Spinner",
      question: "Can I customize the wheel colors?",
      answer:
        "The wheel automatically assigns distinct colors to each segment to ensure visual clarity and differentiation. While you can't manually choose specific colors for each segment, the system intelligently selects colors that provide good contrast and visibility. You can add custom labels to each segment, and the wheel will display them clearly with the automatically assigned colors. This design ensures that every segment is easily distinguishable, making it perfect for presentations, live streams, or any scenario where visual clarity is important.",
    },
    {
      category: "Number Generator",
      question: "What randomness method does the number generator use?",
      answer:
        "The number generator uses the browser's Web Crypto API (crypto.getRandomValues) combined with rejection sampling to avoid modulo bias. This provides cryptographically secure randomness that draws entropy from your operating system's hardware sources. Everything runs client-side for maximum security and privacy, meaning your number ranges and selections never leave your device. This method ensures true uniform distribution across your specified range, making it suitable for lottery simulations, raffles, statistical sampling, and any application requiring verifiable fair randomness.",
    },
    {
      category: "Number Generator",
      question: "Can I prevent duplicate numbers?",
      answer:
        "Yes, you can easily prevent duplicate numbers. Simply disable the \"Allow duplicates\" switch in the number generator settings. When this option is disabled, the tool will generate unique numbers without any repetition. The tool will automatically warn you if the quantity you request exceeds the available range size (for example, trying to generate 100 unique numbers from a range of 1-50). This feature is essential for scenarios like lottery number generation, unique ticket assignment, or any situation where each number must appear only once.",
    },
    {
      category: "Number Generator",
      question: "What's the maximum range I can use?",
      answer:
        "We recommend staying under 100,000 numbers for optimal performance and responsiveness. However, the tool can technically handle much larger ranges. For ranges above 100,000, you may experience slightly slower generation times, but the tool will still function correctly. If you need to work with very large ranges, you can run multiple batches or contact us for assistance with specific use cases. The tool is designed to be efficient and fast for typical use cases while remaining flexible enough to handle larger requirements when needed.",
    },
    {
      category: "Number Generator",
      question: "Can I generate multiple numbers at once?",
      answer:
        "Yes, you can generate multiple numbers in a single draw. Simply set the quantity field to the number of numbers you need, and the tool will generate them all at once. You can choose whether to allow duplicates or ensure all numbers are unique. This feature is perfect for lottery simulations where you need multiple numbers per ticket, raffle draws with multiple winners, or any scenario where you need several random numbers simultaneously. The results are displayed clearly, and you can see all generated numbers at once.",
    },
    {
      category: "Name Picker",
      question: "How do I add names to the picker?",
      answer:
        "Adding names is simple and flexible. You can paste your list of names directly into the text area, with one name per line. The tool automatically processes and prepares them for selection. You can import names from spreadsheets by copying and pasting, or type them directly. The tool handles various formats and automatically removes empty lines and trims whitespace. This makes it easy to work with class lists, participant rosters, team member names, or any collection of names you need to select from. There's no limit on how many names you can add.",
    },
    {
      category: "Name Picker",
      question: "Can I pick multiple names at once?",
      answer:
        "Yes, you can select multiple names in a single draw. Set the quantity field to the number of names you want to pick, and the tool will randomly select that many names from your list. Each name will be selected fairly and randomly, and when duplicates are disabled, each name can only be selected once per draw. This feature is perfect for selecting multiple winners from a giveaway, choosing several team members, picking multiple students for an activity, or any scenario where you need to select more than one person at a time.",
    },
    {
      category: "Name Picker",
      question: "Does the name picker work offline?",
      answer:
        "Yes, the name picker works completely offline once the page is loaded. Since all processing happens client-side in your browser, you don't need an active internet connection to use the tool after the initial page load. This makes it perfect for classrooms with patchy Wi-Fi, remote locations with limited connectivity, or any situation where internet reliability is a concern. Simply load the page when you have internet, and you can continue using the name picker even if your connection drops. All functionality remains available offline.",
    },
    {
      category: "Name Picker",
      question: "Can I see a history of previous picks?",
      answer:
        "Yes, the name picker maintains a comprehensive history of the last 10 draws. Each history entry shows which names were selected, when the draw occurred, and you can expand each entry to see full details including all selected names. The history is stored locally in your browser, so it persists across page refreshes but remains private on your device. You can clear the history at any time with a single click. This feature is perfect for tracking multiple selections, reviewing past draws, or maintaining a record of selections for transparency and verification purposes.",
    },
    {
      category: "All Tools",
      question: "Do the tools work on mobile devices?",
      answer:
        "Yes, all AllWheel tools are fully responsive and work seamlessly on desktop computers, tablets, and mobile devices. The interface automatically adapts to your screen size, ensuring optimal usability regardless of device. Touch interactions are fully supported, making it easy to use the tools on smartphones and tablets. Whether you're running a giveaway on your phone, using the name picker on a tablet in the classroom, or accessing the number generator on a desktop, you'll have the same full functionality and user experience across all devices.",
    },
    {
      category: "All Tools",
      question: "Can I export or save my results?",
      answer:
        "Results are automatically stored locally in your browser's history feature, which persists across page refreshes. You can view past selections in the history section of each tool, expand entries to see full details, and manually copy results if needed. The history shows timestamps and complete selection information for verification purposes. While advanced export functionality (like CSV or PDF export) is coming soon, the current history feature provides reliable access to past results. You can also take screenshots or manually copy results for external documentation if needed.",
    },
    {
      category: "All Tools",
      question: "Are the tools suitable for official giveaways and contests?",
      answer:
        "Yes, AllWheel tools are suitable for official giveaways, contests, and fair selection processes. They use cryptographically secure randomness that provides transparent, verifiable results. The client-side processing ensures that selections cannot be manipulated, and the randomness method meets professional standards. Many users rely on AllWheel for official giveaways, social media contests, classroom activities, team selections, and other scenarios requiring verifiable fairness. The tools provide the transparency and security needed for official use while remaining free and accessible to everyone.",
    },
    {
      category: "All Tools",
      question: "What browsers are supported?",
      answer:
        "AllWheel tools work on all modern browsers including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and other Chromium-based browsers. The tools require JavaScript to be enabled, which is standard for all modern web applications. We recommend using the latest version of your preferred browser for the best experience and security. The tools are tested regularly across different browsers and devices to ensure consistent functionality. If you encounter any issues with a specific browser, please let us know so we can address it.",
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
                      <div className="flex items-start gap-4 w-full pr-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs uppercase tracking-wide text-primary bg-primary/10 font-semibold flex-shrink-0 mt-0.5 whitespace-nowrap">
                          {faq.category}
                        </span>
                        <span className="text-base font-semibold text-foreground flex-1 text-left leading-tight">
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


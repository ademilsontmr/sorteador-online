import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { NumberDraw } from "@/components/NumberDraw";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { blogPosts } from "@/data/blog-posts";
import { Link } from "react-router-dom";

const NumberGeneratorPage = () => {
  const faqs = [
    {
      question: "Which randomness method do you use?",
      answer:
        "AllWheel relies on the browser's Web Crypto API (crypto.getRandomValues) with rejection sampling to avoid modulo bias. Everything runs client-side.",
    },
    {
      question: "Can I prevent duplicate numbers?",
      answer:
        "Yes. Disable the \"Allow duplicates\" switch to pull unique values without repetition. The quantity field will warn you if you exceed the range size.",
    },
    {
      question: "How do I export proof of a draw?",
      answer:
        "After running the generator, use the export button in the history card (coming soon) or copy the results and timestamp manually for your audit log.",
    },
    {
      question: "Is there a limit on range size?",
      answer:
        "We recommend staying under 100,000 numbers for performance. For bigger ranges, run multiple batches or contact us about the Randomness API.",
    },
  ];

  const relatedArticles = blogPosts
    .filter((post) =>
      post.tags.some((tag) =>
        ["random numbers", "RNG", "number generator", "cryptography", "fair selection"].some((keyword) =>
          tag.toLowerCase().includes(keyword.toLowerCase())
        )
      ) || post.slug.includes("random-number")
    )
    .slice(0, 3);

  return (
    <>
      <SEO
        title="Random Number Generator - Secure Number Draw Tool | AllWheel"
        description="Generate random numbers within any range. Support for multiple numbers, no duplicates, instant results, and Web Crypto security."
        canonical="https://allwheel.click/number-generator"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <NumberDraw />

          <section className="bg-background border-t border-border/60 py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
              <header>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
                <h2 className="text-3xl font-bold mt-2 mb-3">
                  Random Number Generator — Questions & Answers
                </h2>
                <p className="text-muted-foreground">
                  Click a question to expand the answer and learn how to get the most from the RNG tool.
                </p>
              </header>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${index}`}
                    className="border border-border/70 rounded-2xl px-4"
                  >
                    <AccordionTrigger className="text-left">
                      <h3 className="text-lg font-semibold">{faq.question}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {relatedArticles.length > 0 && (
            <section className="bg-muted/30 border-t border-border/60 py-16">
              <div className="container mx-auto px-4 max-w-4xl space-y-6">
                <header>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Blog</p>
                  <h2 className="text-3xl font-bold mt-2 mb-3">Related Articles</h2>
                  <p className="text-muted-foreground">
                    Learn more about random number generation, cryptography, and fair selection methods.
                  </p>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/blog/${article.slug}`}
                      className="block"
                    >
                      <Card className="p-5 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 h-full">
                        <p className="text-sm uppercase tracking-wide text-primary mb-2">
                          {article.category}
                        </p>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {article.description}
                        </p>
                        <span className="text-primary font-semibold text-sm">
                          Read article →
                        </span>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NumberGeneratorPage;


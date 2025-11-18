import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { SpinWheel } from "@/components/SpinWheel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { blogPosts } from "@/data/blog-posts";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const SpinWheelPage = () => {
  const faqs = [
    {
      question: "Can I remove winners automatically?",
      answer:
        "Yes. Use the \"Remove winner after spin\" toggle inside the wheel controls to ensure each name is drawn only once.",
    },
    {
      question: "What randomness engine does the wheel use?",
      answer:
        "The wheel animation is backed by Web Crypto randomness. Each spin is seeded from crypto.getRandomValues for verifiable fairness.",
    },
    {
      question: "How do I share a wheel with my class or team?",
      answer:
        "Create the wheel, save the configuration, and share the generated URL. Everyone with the link can spin with the same entries.",
    },
    {
      question: "Can I add sounds or confetti?",
      answer:
        "Absolutely. Enable sound effects and confetti in the controls panel. They run locally so streams and classrooms stay in sync.",
    },
  ];

  const relatedArticles = blogPosts
    .filter((post) =>
      post.tags.some((tag) =>
        ["wheel spinner", "spin wheel", "giveaways", "streaming", "education", "classroom"].some((keyword) =>
          tag.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    )
    .slice(0, 3);

  return (
    <>
      <SEO
        title="Spin the Wheel - Free Online Random Wheel Spinner | AllWheel"
        description="Create fair random selections with our free spin the wheel tool. Unlimited items, remove winner option, confetti animation, and instant results."
        canonical="https://allwheel.click/spin-wheel"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <SpinWheel />

          <section className="bg-background border-t border-border/60 py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
              <header>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
                <h2 className="text-3xl font-bold mt-2 mb-3">Wheel Spinner — Questions & Answers</h2>
                <p className="text-muted-foreground">
                  Tips for teachers, streamers, and giveaway hosts using our wheel.
                </p>
              </header>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`wheel-faq-${index}`}
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
                    Explore more guides and tips about wheel spinners and random selection tools.
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

export default SpinWheelPage;


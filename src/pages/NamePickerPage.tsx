import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { NameDraw } from "@/components/NameDraw";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { blogPosts } from "@/data/blog-posts";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const NamePickerPage = () => {
  const faqs = [
    {
      question: "Can I import a class list quickly?",
      answer:
        "Yes. Paste a multiline list, import from CSV, or use the upcoming Google Classroom sync to populate the wheel instantly.",
    },
    {
      question: "How do I ensure a student is picked only once?",
      answer:
        "Enable the \"Remove winner after spin\" option inside Name Picker. Each selection is logged so you can re-add names later if needed.",
    },
    {
      question: "Does the picker work offline?",
      answer:
        "Name Picker runs fully client-side, so once the page is loaded you can continue using it even with patchy Wi‑Fi (perfect for classrooms).",
    },
    {
      question: "Can I share the results with parents or admins?",
      answer:
        "Use the export option or copy the draw log to email or your LMS. Each draw includes timestamps for transparency.",
    },
  ];

  const relatedArticles = blogPosts
    .filter((post) =>
      post.tags.some((tag) =>
        ["name picker", "classroom", "education", "teaching", "random selection", "wheel of names"].some((keyword) =>
          tag.toLowerCase().includes(keyword.toLowerCase())
        )
      ) || post.slug.includes("name") || post.slug.includes("classroom")
    )
    .slice(0, 3);

  return (
    <>
      <SEO
        title="Random Name Picker - Fair Name Draw Tool | AllWheel"
        description="Pick random names from your list instantly. Ideal for classrooms, raffles, and team selection. Supports multiple winners and transparent results."
        canonical="https://allwheel.click/name-picker"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <NameDraw />

          <section className="bg-background border-t border-border/60 py-16">
    <div className="container mx-auto px-4 max-w-4xl space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
        <h2 className="text-3xl font-bold mt-2 mb-3">Name Picker — Questions & Answers</h2>
        <p className="text-muted-foreground">
          Best practices for teachers, HR teams, and community leaders running impartial name draws.
        </p>
      </header>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`name-faq-${index}`}
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
                    Discover more strategies for using name pickers in classrooms, teams, and events.
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

export default NamePickerPage;


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
import { getCategoryLabel } from "@/lib/category-translations";

const SpinWheelPage = () => {
  const faqs = [
    {
      question: "Posso remover vencedores automaticamente?",
      answer:
        "Sim. Ative o interruptor “Remover vencedor após girar” nos controles para garantir que cada nome saia apenas uma vez.",
    },
    {
      question: "Que motor de aleatoriedade a roleta usa?",
      answer:
        "A animação usa a aleatoriedade da Web Crypto. Cada giro recebe uma semente gerada por crypto.getRandomValues para garantir justiça verificável.",
    },
    {
      question: "Como compartilhar a roleta com a turma ou equipe?",
      answer:
        "Crie a roleta, salve a configuração e compartilhe o link gerado. Quem receber poderá girar com os mesmos itens.",
    },
    {
      question: "Posso adicionar sons ou confete?",
      answer:
        "Sim! Ative os efeitos sonoros e confetes no painel de controles. Tudo roda localmente para manter transmissões e aulas sincronizadas.",
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
        title="Roleta Aleatória Personalizada Online | Gire a Roleta Grátis"
        description="Crie sua Roleta Personalizada e gire agora! Ferramenta 100% grátis para sorteios, jogos e decisões. Adicione nomes, cores e gire a roleta online."
        canonical="https://sorteador.click/roleta"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <SpinWheel />

          <section className="bg-background border-t border-border/60 py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
              <header>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
                <h2 className="text-3xl font-bold mt-2 mb-3">Roleta — perguntas e respostas</h2>
                <p className="text-muted-foreground">
                  Dicas para professores, streamers e anfitriões de sorteios que usam a ferramenta.
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
                  <h2 className="text-3xl font-bold mt-2 mb-3">Artigos relacionados</h2>
                  <p className="text-muted-foreground">
                    Explore mais guias e dicas sobre roletas e ferramentas de seleção aleatória.
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
                          {getCategoryLabel(article.category)}
                        </p>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {article.description}
                        </p>
                        <span className="text-primary font-semibold text-sm">
                          Ler artigo →
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


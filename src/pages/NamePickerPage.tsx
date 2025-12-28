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
import { getCategoryLabel } from "@/lib/category-translations";

const NamePickerPage = () => {
  const faqs = [
    {
      question: "Posso importar rapidamente a lista da turma?",
      answer:
        "Sim. Cole uma lista com várias linhas, importe um CSV ou use a sincronização com Google Classroom (em breve) para preencher tudo automaticamente.",
    },
    {
      question: "Como garanto que cada aluno seja sorteado apenas uma vez?",
      answer:
        "Ative a opção “Remover vencedor após girar” dentro do selecionador. Cada resultado fica salvo no histórico e você pode recolocar nomes quando precisar.",
    },
    {
      question: "O selecionador funciona offline?",
      answer:
        "Funciona sim. Depois que a página carregar, o Name Picker roda totalmente no navegador, mesmo com Wi‑Fi instável — ótimo para salas de aula.",
    },
    {
      question: "Consigo compartilhar o resultado com responsáveis ou gestores?",
      answer:
        "Use a exportação ou copie o log do sorteio para enviar por e-mail ou pelo LMS. Cada sorteio traz carimbo de data e hora para transparência.",
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
        title="Sorteador de Nomes e Lista | Sorteio Aleatório Online"
        description="Sorteie nomes de uma lista facilmente. Cole seus nomes, gire e descubra o vencedor. Perfeito para sorteios de Instagram, amigos secretos e grupos."
        canonical="https://sorteador.click/selecionador-de-nomes"
        keywords="sorteador de nomes, lista de nomes, sortear nomes, random name picker, sorteio de nomes, sorteador lista"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <NameDraw />

          <section className="bg-background border-t border-border/60 py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
              <header>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
                <h2 className="text-3xl font-bold mt-2 mb-3">Selecionador de nomes — perguntas e respostas</h2>
                <p className="text-muted-foreground">
                  Boas práticas para professores, RH e comunidades que precisam de sorteios imparciais.
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
                  <h2 className="text-3xl font-bold mt-2 mb-3">Artigos relacionados</h2>
                  <p className="text-muted-foreground">
                    Descubra estratégias para usar selecionadores de nomes em aulas, equipes e eventos.
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

export default NamePickerPage;


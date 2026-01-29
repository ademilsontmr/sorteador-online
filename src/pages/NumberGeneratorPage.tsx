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
import { getCategoryLabel } from "@/lib/category-translations";

const NumberGeneratorPage = () => {
  const faqs = [
    {
      question: "Qual método de aleatoriedade é utilizado?",
      answer:
        "O Sorteador usa a Web Crypto API do navegador (crypto.getRandomValues) com rejection sampling para evitar viés de módulo. Todo o processamento é local.",
    },
    {
      question: "Consigo impedir números duplicados?",
      answer:
        "Sim. Desative o interruptor “Permitir repetição” para receber apenas valores únicos. Informamos se a quantidade exceder o intervalo.",
    },
    {
      question: "Como exportar a prova de um sorteio?",
      answer:
        "Após gerar os números, use o botão de exportação no histórico (em breve) ou copie resultados e horários manualmente para seu relatório.",
    },
    {
      question: "Existe limite para o tamanho do intervalo?",
      answer:
        "Recomendamos ficar abaixo de 100 mil números para manter o desempenho. Para intervalos maiores, execute lotes ou fale conosco sobre a Randomness API.",
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
        title="Sorteador de Números Aleatórios | Gerador Online Grátis"
        description="Gere números aleatórios instantaneamente. Defina intervalos, quantidade e sorteie sem repetições. Ideal para rifas, jogos e sorteios rápidos."
        canonical="https://sorteador.click/gerador-de-numeros/"
        keywords="gerador de números, números aleatórios, sortear números, random number generator, sorteio de números, sorteador de números"
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
                  Gerador de números — perguntas e respostas
                </h2>
                <p className="text-muted-foreground">
                  Clique nas perguntas para ver dicas e extrair o máximo do RNG.
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
                  <h2 className="text-3xl font-bold mt-2 mb-3">Artigos relacionados</h2>
                  <p className="text-muted-foreground">
                    Saiba mais sobre geração de números aleatórios, criptografia e métodos de seleção justa.
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

export default NumberGeneratorPage;


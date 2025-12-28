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
      category: "Geral",
      question: "As ferramentas do Sorteador são gratuitas?",
      answer:
        "Sim. Todas as ferramentas são 100% gratuitas, sem cadastro, assinaturas ou limitações ocultas. Tudo roda localmente no seu navegador, então você pode realizar desde um único sorteio até centenas de seleções aleatórias sem pagar nada.",
    },
    {
      category: "Geral",
      question: "Preciso criar uma conta?",
      answer:
        "Não. Basta acessar a página da ferramenta desejada e começar a usar. Nada de formulários, confirmações por e-mail ou logins. Isso torna o Sorteador perfeito para decisões rápidas e atividades improvisadas, protegendo sua privacidade, já que não solicitamos dados pessoais.",
    },
    {
      category: "Geral",
      question: "Meus dados são armazenados ou compartilhados?",
      answer:
        "Nunca. Todo o processamento acontece no seu navegador usando JavaScript client-side. Não enviamos nomes, números ou resultados para servidores externos. Apenas o histórico fica salvo no armazenamento local do navegador e pode ser limpo a qualquer momento.",
    },
    {
      category: "Geral",
      question: "Como o Sorteador garante aleatoriedade justa?",
      answer:
        "Utilizamos a Web Crypto API do navegador (crypto.getRandomValues) com rejection sampling para evitar viés. O método é o mesmo adotado por profissionais de segurança, roda totalmente no dispositivo e é adequado para sorteios oficiais, concursos e qualquer cenário que exija transparência.",
    },
    {
      category: "Roleta",
      question: "Quantos itens posso adicionar à roleta?",
      answer:
        "Não há limite. A roleta se adapta automaticamente para exibir de 2 a 500+ itens, mantendo a probabilidade igual para cada segmento. Ideal para decisões simples ou sorteios com centenas de participantes.",
    },
    {
      category: "Roleta",
      question: "Consigo remover o vencedor após cada giro?",
      answer:
        "Sim. Ative a opção \"Remover vencedor após girar\" e o item sorteado sai automaticamente da lista, garantindo que não apareça novamente até você adicioná-lo de volta. Perfeito para distribuir prêmios sem repetição.",
    },
    {
      category: "Roleta",
      question: "Existem sons e animações?",
      answer:
        "Sim. Há efeitos sonoros opcionais e confetes para deixar a experiência mais emocionante em transmissões, aulas ou eventos ao vivo. Você pode ligar ou desligar tudo com um clique e os efeitos são executados localmente.",
    },
    {
      category: "Roleta",
      question: "Posso escolher as cores da roleta?",
      answer:
        "As cores são atribuídas automaticamente para garantir contraste e legibilidade. Você personaliza os rótulos e o sistema cuida do visual, mantendo cada fatia fácil de distinguir em apresentações e lives.",
    },
    {
      category: "Gerador de números",
      question: "Que método de aleatoriedade vocês usam?",
      answer:
        "O gerador usa Web Crypto API com rejection sampling, garantindo distribuição uniforme e segurança criptográfica. Tudo ocorre no seu navegador, então intervalos e resultados nunca deixam o dispositivo.",
    },
    {
      category: "Gerador de números",
      question: "Dá para impedir números repetidos?",
      answer:
        "Sim. Desative o interruptor “Permitir repetição” para receber apenas números únicos. Se a quantidade solicitar mais valores do que o intervalo comporta, o sistema avisa automaticamente.",
    },
    {
      category: "Gerador de números",
      question: "Qual é o intervalo máximo recomendado?",
      answer:
        "Para melhor desempenho sugerimos intervalos abaixo de 100 mil, mas valores maiores também funcionam, apenas com geração um pouco mais lenta. Para intervalos gigantes, execute lotes menores ou entre em contato conosco.",
    },
    {
      category: "Gerador de números",
      question: "Posso gerar vários números de uma vez?",
      answer:
        "Pode sim. Informe quantos números deseja e o Sorteador entrega tudo em um único sorteio, com ou sem repetição. Ótimo para simular jogos, rifas com vários ganhadores ou listas de amostragem.",
    },
    {
      category: "Selecionador de nomes",
      question: "Como adiciono nomes ao sorteio?",
      answer:
        "Cole ou digite um nome por linha. Aceitamos dados vindos de planilhas, removemos linhas vazias automaticamente e tratamos espaços extras, facilitando trabalhar com listas grandes de alunos ou participantes.",
    },
    {
      category: "Selecionador de nomes",
      question: "Consigo sortear vários nomes de uma vez?",
      answer:
        "Sim. Defina a quantidade desejada e o sistema escolhe todos de forma justa. Com duplicados desativados, ninguém é selecionado duas vezes no mesmo sorteio.",
    },
    {
      category: "Selecionador de nomes",
      question: "Funciona offline?",
      answer:
        "Depois que a página carrega, tudo continua funcionando sem internet, pois o processamento é local. Ideal para salas de aula com Wi-Fi instável ou eventos em locais remotos.",
    },
    {
      category: "Selecionador de nomes",
      question: "Existe histórico dos sorteios?",
      answer:
        "Sim. Guardamos os 10 últimos sorteios com a lista completa de nomes. As entradas ficam no seu navegador, podem ser expandidas e você pode limpar tudo quando quiser.",
    },
    {
      category: "Todas as ferramentas",
      question: "Funciona bem no celular?",
      answer:
        "Totalmente. A interface é responsiva e aceita toques, funcionando igual em desktops, tablets e smartphones — perfeito para usar na sala, no escritório ou em eventos itinerantes.",
    },
    {
      category: "Todas as ferramentas",
      question: "Posso salvar ou exportar resultados?",
      answer:
        "Você consegue copiar dados diretamente do histórico, que permanece após recarregar a página. Exportações avançadas (CSV/PDF) estão no roteiro, mas hoje já é possível copiar ou fazer capturas para documentação.",
    },
    {
      category: "Todas as ferramentas",
      question: "Serve para sorteios oficiais?",
      answer:
        "Sim. A aleatoriedade criptográfica e o processamento local evitam manipulação, entregando transparência para concursos, promoções e seleções auditáveis.",
    },
    {
      category: "Todas as ferramentas",
      question: "Quais navegadores são suportados?",
      answer:
        "Chrome, Firefox, Safari, Edge e demais navegadores modernos com JavaScript habilitado. Recomendamos manter a versão atualizada para melhor desempenho e segurança.",
    },
  ];

  return (
    <>
      <SEO
        title="Ferramentas de Sorteio e Utilitários Online | Sorteador"
        description="Explore nossa coleção de ferramentas gratuitas: dados, cara ou coroa, sorteadores e muito mais. Tudo o que você precisa para decisões aleatórias."
        canonical="https://sorteador.click/ferramentas"
        keywords="ferramentas de sorteio, utilitários, sorteio, randomizadores, dados, cara ou coroa"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Ferramentas gratuitas de seleção aleatória
                </h1>
                <p className="text-lg text-muted-foreground">
                  Conjunto completo para sorteios, jogos, decisões em equipe e atividades educacionais.
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
                        {tool.actionLabel}
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
                  Perguntas frequentes
                </h2>
                <p className="text-muted-foreground">
                  Veja respostas rápidas sobre funcionamento, privacidade e melhores práticas das ferramentas Sorteador.
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


import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tools } from "@/data/tools";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 -z-10 gradient-subtle" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.35),_transparent_60%)]" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Suíte de Seleção Aleatória
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Sorteador Online: Roleta, Números e Nomes
            </h1>
            <p className="text-xl text-muted-foreground">
              Tome decisões comprovadamente justas com nossa roleta segura, sorteador de números e sorteador de nomes — ideal para sorteios, aulas e times remotos.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Tudo é gratuito, seguro e pronto para usar em aulas, sorteios ou rituais de equipe.
          </div>

          <h2 className="text-2xl font-semibold text-foreground">
            Suas ferramentas de sorteio gratuitas, justas e sem cadastro
          </h2>
        </div>

        <div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-3">
          {tools.map((tool, index) => (
            <Card
              key={tool.id}
              className="flex flex-col p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${tool.iconBgClass} flex items-center justify-center mb-5 shadow-glow`}>
                <tool.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
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
                  Testar agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            Sem necessidade de conta
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            Resultados imediatos
          </span>
        </div>
      </div>
    </section>
  );
};

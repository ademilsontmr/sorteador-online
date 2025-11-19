import { Card } from "@/components/ui/card";
import { GraduationCap, Gift, Users, Briefcase, PartyPopper, Dices } from "lucide-react";

const useCases = [
  {
    icon: Gift,
    title: "Sorteios e concursos",
    description: "Seleção justa de vencedores para promoções e redes sociais",
    bgColor: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: GraduationCap,
    title: "Atividades escolares",
    description: "Seleção aleatória de alunos, formação de equipes e dinâmicas",
    bgColor: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Briefcase,
    title: "Decisões corporativas",
    description: "Distribuição de projetos, ordem de reuniões e escolhas imparciais",
    bgColor: "bg-success/10",
    iconColor: "text-success"
  },
  {
    icon: Users,
    title: "Team building",
    description: "Monte equipes aleatórias, escolha voluntários e organize grupos",
    bgColor: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: PartyPopper,
    title: "Eventos e festas",
    description: "Amigo secreto, ordem de jogos e dinâmicas para festas",
    bgColor: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Dices,
    title: "Jogos e diversão",
    description: "Tomada de decisão, verdade ou desafio e missões aleatórias",
    bgColor: "bg-success/10",
    iconColor: "text-success"
  }
];

export const UseCases = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sorteios para todas as ocasiões
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra como educadores, profissionais de marketing e líderes confiam no Sorteador para manter cada decisão transparente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-lg ${useCase.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <useCase.icon className={`h-6 w-6 ${useCase.iconColor}`} />
              </div>
              <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

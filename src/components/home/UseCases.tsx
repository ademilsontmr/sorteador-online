import { Card } from "@/components/ui/card";
import { GraduationCap, Gift, Users, Briefcase, PartyPopper, Dices } from "lucide-react";

const useCases = [
  {
    icon: Gift,
    title: "Giveaways & Contests",
    description: "Fair winner selection for social media contests and promotions",
    bgColor: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: GraduationCap,
    title: "Classroom Activities",
    description: "Random student selection, team formation, and educational games",
    bgColor: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Briefcase,
    title: "Business Decisions",
    description: "Project assignments, meeting order, and unbiased selections",
    bgColor: "bg-success/10",
    iconColor: "text-success"
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Create random teams, pick volunteers, and organize groups",
    bgColor: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: PartyPopper,
    title: "Events & Parties",
    description: "Secret Santa, game night selections, and party activities",
    bgColor: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Dices,
    title: "Games & Fun",
    description: "Decision making, truth or dare, and random challenges",
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
            Perfect For Every Occasion
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From classrooms to boardrooms, from parties to promotions
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

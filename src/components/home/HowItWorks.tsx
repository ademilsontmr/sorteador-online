import { Card } from "@/components/ui/card";
import { ListPlus, Settings, Play, Trophy } from "lucide-react";

const steps = [
  {
    icon: ListPlus,
    title: "Adicione suas opções",
    description: "Informe itens, nomes ou defina intervalos numéricos"
  },
  {
    icon: Settings,
    title: "Personalize as configurações",
    description: "Ajuste quantidade, intervalo ou opções especiais"
  },
  {
    icon: Play,
    title: "Execute o sorteio",
    description: "Clique em girar ou sortear para iniciar o processo"
  },
  {
    icon: Trophy,
    title: "Veja os resultados",
    description: "Vencedor aleatório, justo e verificável na hora"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Como fazer um sorteio online justo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siga estes quatro passos para reunir entradas, configurar o sorteio e divulgar resultados aleatórios verificáveis.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 text-center shadow-card h-full">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-glow">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-3 text-primary/30">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

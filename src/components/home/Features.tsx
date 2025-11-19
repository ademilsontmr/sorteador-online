import { Shield, Zap, Smartphone, Globe, Lock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Comprovadamente justo",
    description: "Geração de números aleatórios com segurança criptográfica"
  },
  {
    icon: Zap,
    title: "Resultados instantâneos",
    description: "Sem espera, sem atrasos — seleção imediata"
  },
  {
    icon: Smartphone,
    title: "Pronto para mobile",
    description: "Funciona em qualquer dispositivo, de qualquer lugar"
  },
  {
    icon: Globe,
    title: "Sem cadastro",
    description: "Use imediatamente, sem necessidade de conta"
  },
  {
    icon: Lock,
    title: "Privacidade em primeiro lugar",
    description: "Seus dados nunca saem do navegador"
  },
  {
    icon: Sparkles,
    title: "100% gratuito",
    description: "Todos os recursos liberados para sempre"
  }
];

export const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Por que usar nosso Sorteador Online?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            O Sorteador combina aleatoriedade criptográfica, boas práticas de acessibilidade e uso gratuito para manter cada decisão transparente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

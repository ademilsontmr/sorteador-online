import { Shield, Zap, Smartphone, Globe, Lock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Provably Fair",
    description: "Cryptographically secure random number generation"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No waiting, no delays - immediate selection"
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on any device, anywhere"
  },
  {
    icon: Globe,
    title: "No Registration",
    description: "Start using immediately, no account needed"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data never leaves your browser"
  },
  {
    icon: Sparkles,
    title: "100% Free",
    description: "All features available at no cost, forever"
  }
];

export const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Key Features That Power Every Fair Random Draw
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AllWheel combines cryptographic randomness, accessibility best practices, and zero-cost usage to keep every decision transparent.
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

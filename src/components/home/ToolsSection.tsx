import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Hash, Users, ArrowRight } from "lucide-react";

const tools = [
  {
    id: "wheel",
    icon: Sparkles,
    title: "Spin the Wheel",
    description: "Visual and engaging way to make random selections. Perfect for giveaways and fun decisions.",
    features: ["Unlimited items", "Sound effects", "Confetti animation", "Remove winner option"],
    color: "primary",
    gradient: "gradient-primary"
  },
  {
    id: "numbers",
    icon: Hash,
    title: "Number Generator",
    description: "Generate random numbers within any range. Ideal for lottery draws and raffles.",
    features: ["Custom range", "Multiple numbers", "No duplicates", "Instant results"],
    color: "accent",
    gradient: "gradient-accent"
  },
  {
    id: "names",
    icon: Users,
    title: "Name Picker",
    description: "Randomly select names from your list. Great for classroom activities and team selection.",
    features: ["Pick multiple", "Fair selection", "Quick setup", "Clear results"],
    color: "success",
    gradient: "bg-success"
  }
];

export const ToolsSection = () => {
  const scrollToTool = (toolId: string) => {
    const element = document.getElementById(`tool-${toolId}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="tools" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Three Powerful Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect random selection tool for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tools.map((tool, index) => (
            <Card 
              key={tool.id}
              className="p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${tool.gradient} flex items-center justify-center mb-4 shadow-glow`}>
                <tool.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${tool.color}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => scrollToTool(tool.id)}
                variant="outline"
                className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
              >
                Try Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

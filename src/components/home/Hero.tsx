import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Zap } from "lucide-react";

export const Hero = () => {
  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 gradient-subtle" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">100% Free & Fair Random Selection</span>
            <Zap className="h-4 w-4 text-accent" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Make Decisions{" "}
            <span className="bg-clip-text text-transparent gradient-primary">
              Fast & Fair
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Spin the wheel, draw numbers, or pick names randomly. 
            Perfect for giveaways, classrooms, raffles, and team decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="gradient-primary shadow-glow hover:opacity-90 text-lg px-8 py-6"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try It Free Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToTools}
              className="text-lg px-8 py-6"
            >
              See How It Works
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              No Registration Required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Cryptographically Secure
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Instant Results
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

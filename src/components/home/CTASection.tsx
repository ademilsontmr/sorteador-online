import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export const CTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
            
            <div className="relative z-10">
              <Sparkles className="h-16 w-16 text-white mx-auto mb-6 animate-bounce" />
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to Make Your Next Decision?
              </h2>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users making fair, random selections every day. 
                No registration, no cost, no hassle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={scrollToTop}
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg"
                >
                  Start Using Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/blog'}
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

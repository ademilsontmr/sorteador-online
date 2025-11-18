import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { UseCases } from "@/components/home/UseCases";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AllWheel - Free Random Wheel, Number & Name Picker",
    url: "https://allwheel.click",
    description: "Free online random selection tools. Spin the wheel, generate random numbers, or pick names. Perfect for giveaways, classrooms, and fair decision making. No registration required.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: [
      "Random wheel spinner",
      "Number generator",
      "Name picker",
      "Cryptographically secure",
      "No registration required",
      "Mobile friendly"
    ]
  };

  return (
    <>
      <SEO 
        title="Free Random Wheel Spinner, Number & Name Picker - AllWheel" 
        description="Free online random selection tools for giveaways, classrooms, and decisions. Spin the wheel, generate numbers, pick names. Fair, instant, and secure. No registration needed."
        canonical="https://allwheel.click/" 
        structuredData={structuredData} 
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Hero />
          <HowItWorks />
          <Features />
          <UseCases />
          
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
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
    name: "Sorteador Online - Roleta, Números e Nomes",
    url: "https://sorteador.click",
    description: "Faça sorteios online com o Sorteador. Ferramentas gratuitas: Gire a Roleta, Sorteador de Números e Sorteador de Nomes. Rápido, justo e sem cadastro.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL"
    },
    featureList: [
      "Roleta aleatória",
      "Sorteador de números",
      "Sorteador de nomes",
      "Segurança criptográfica",
      "Sem necessidade de cadastro",
      "Experiência mobile"
    ]
  };

  return (
    <>
      <SEO
        title="Sorteador Online: Roleta, Sorteio de Números e Nomes Grátis"
        description="Sorteador Online 100% Grátis! Faça sorteios de números, nomes e gire a roleta. Ferramenta rápida, segura e sem cadastro. Ideal para Instagram e rifas."
        canonical="https://sorteador.click/"
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
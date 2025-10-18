import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { SpinWheel } from "@/components/SpinWheel";
import { NumberDraw } from "@/components/NumberDraw";
import { NameDraw } from "@/components/NameDraw";
const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AllWheel - Random Wheel & Number Picker",
    url: "https://allwheel.click",
    description: "Spin the wheel or draw numbers and names online. Fast, fair, and verifiable random selection tool.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
  return <>
      <SEO title="Random Wheel & Number/Name Picker" description="Spin the wheel or draw numbers and names online. Fast, fair, and verifiable random selection tool." canonical="https://allwheel.click/" structuredData={structuredData} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <SpinWheel />
          
          <NameDraw />
        </main>

        <Footer />
      </div>
    </>;
};
export default Index;
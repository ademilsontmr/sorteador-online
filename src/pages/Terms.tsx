import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Terms of Service - AllWheel"
        description="Understand the usage guidelines for AllWheel’s random selection tools."
        canonical="https://allwheel.click/terms"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Effective Date: January 18, 2026
        </p>
        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AllWheel, you agree to these Terms of Service. If you use AllWheel on behalf of an
              organization, you confirm that you have authority to bind that entity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Eligibility</h2>
            <p>
              AllWheel is intended for users 13+ years old. If you operate giveaways or regulated drawings, ensure you comply with
              all applicable laws in your jurisdiction. We are not responsible for illegal use.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. License & Usage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We grant you a limited, revocable license to use AllWheel for personal or business needs.</li>
              <li>You may create wheels, generate random numbers, export logs, and embed our tools following attribution guidelines.</li>
              <li>Do not reverse engineer, resell, or rent access to the platform.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. User Content & Responsibility</h2>
            <p>
              You’re responsible for the accuracy of entries you add to AllWheel. Do not upload unlawful, discriminatory, or
              copyrighted material without permission. If you share exported logs or screenshots, ensure you have consent from participants.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Fairness & Verification</h2>
            <p>
              We provide verifiable randomness features, but ultimate responsibility for running a compliant drawing lies with you. Record spins,
              publish rules, and keep audit logs for the period required by local law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Payment & Upgrades</h2>
            <p>
              Many features are free. If we introduce paid plans, we’ll present pricing before you upgrade. All fees, once paid, are non-refundable
              unless required by law. Taxes and payment processing charges are your responsibility.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Service Availability</h2>
            <p>
              We aim for high uptime but may suspend the service for maintenance, security updates, or force majeure events. We are not liable for
              losses due to outages. Always keep local backups of critical wheels and logs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Prohibited Uses</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using AllWheel for gambling in jurisdictions where it’s not permitted.</li>
              <li>Automating spam entries or attempting to game randomness proofs.</li>
              <li>Distributing malware, scraping excessive data, or attacking our infrastructure.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Disclaimers</h2>
            <p>
              AllWheel is provided “as is.” We disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. We
              are not responsible for indirect or consequential damages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Termination</h2>
            <p>
              We may suspend or terminate access if you violate these terms. You may stop using AllWheel at any time. Sections dealing with
              disclaimers, liability, and governing law survive termination.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">11. Governing Law</h2>
            <p>
              These terms are governed by the laws of the United States and the state of Delaware, unless overridden by mandatory consumer
              protections in your region.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">12. Contact</h2>
            <p>
              For any questions, email <a href="mailto:terms@allwheel.click" className="text-primary hover:underline">terms@allwheel.click</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;


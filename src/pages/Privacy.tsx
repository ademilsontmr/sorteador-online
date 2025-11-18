import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Privacy Policy - AllWheel"
        description="Learn how AllWheel handles data, randomness logs, and security best practices."
        canonical="https://allwheel.click/privacy"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Effective Date: January 18, 2026
        </p>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Overview</h2>
            <p>
              AllWheel was built to keep decisions fair without putting your data at risk. Our tools run client-side
              inside your browser, meaning your entries, spins, and randomness logs stay with you unless you explicitly
              export them. This document explains what minimal data we collect, how we use it, and the choices you have.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Data We Process</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Usage telemetry (optional):</strong> anonymized metrics such as feature toggles and device type to identify bugs.</li>
              <li><strong>Support messages:</strong> when you email us, we keep that correspondence to respond and improve our documentation.</li>
              <li><strong>Exported randomness logs:</strong> generated only on your device; we never receive copies unless you send them for support.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. What We Never Collect</h2>
            <p>
              AllWheel does <strong>not</strong> collect or store participant lists, wheel entries, or draw results on our servers.
              We don’t track cookies for advertising, sell personal data, or embed third-party analytics scripts.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Client-Side Storage</h2>
            <p>
              When you save a wheel, your browser stores that configuration in local storage. You can clear it at any time via your
              browser settings or by using the “Clear All” button inside AllWheel. No one else can access those entries unless they
              use your device.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Exported Logs & Compliance</h2>
            <p>
              If you export a verifiable randomness log:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The log stays on your machine; we never automatically upload it.</li>
              <li>You may share it with auditors, contest participants, or regulators at your discretion.</li>
              <li>Deleting that file removes the evidence; AllWheel can’t recover it for you.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Third-Party Services</h2>
            <p>
              We rely on reputable infrastructure vendors (e.g., Vercel, Cloudflare) to host static assets. They may log IP
              addresses in standard server logs for security and rate limiting. Those logs are automatically rotated and are never
              tied to your entries or draws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Your Rights</h2>
            <p>
              Depending on your jurisdiction (GDPR, CCPA, LGPD), you may have rights to access, correct, or delete personal data we
              hold (primarily support messages). Contact us at privacy@allwheel.click and we’ll respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Data Retention</h2>
            <p>
              Support correspondence is retained for up to 24 months to help with troubleshooting recurring issues. Optional telemetry
              is aggregated and stripped of identifiers within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Security Practices</h2>
            <p>
              We enforce HTTPS everywhere, review dependencies regularly, and run automated security scans before deploying updates.
              Disclosure program coming soon—email security@allwheel.click if you discover a vulnerability.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Updates to This Policy</h2>
            <p>
              Material changes will be announced inside the app and via our blog. Continued use after updates means you accept the new terms.
            </p>
          </div>

          <div className="pt-4">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Email <a href="mailto:privacy@allwheel.click" className="text-primary hover:underline">privacy@allwheel.click</a> for any privacy question.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


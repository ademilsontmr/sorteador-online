import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Termos de Uso - Sorteador"
        description="Conheça as regras de utilização das ferramentas de seleção aleatória do Sorteador."
        canonical="https://sorteador.click/termos"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Termos de Uso</h1>
        <p className="text-muted-foreground mb-8">
          Vigentes a partir de: 18 de janeiro de 2026
        </p>
        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Aceitação</h2>
            <p>
              Ao acessar ou usar o Sorteador, você concorda com estes termos. Se utilizá-lo em nome de uma organização, declara
              ter autoridade para vinculá-la ao acordo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Elegibilidade</h2>
            <p>
              O Sorteador destina-se a pessoas com 13 anos ou mais. Caso realize promoções reguladas, cumpra as leis da sua jurisdição.
              Não nos responsabilizamos por uso ilegal.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Licença e uso</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Concedemos uma licença limitada e revogável para uso pessoal ou profissional.</li>
              <li>Você pode criar roletas, gerar números, exportar logs e incorporar as ferramentas seguindo as diretrizes de atribuição.</li>
              <li>É proibido realizar engenharia reversa, revender ou alugar acesso à plataforma.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Conteúdo e responsabilidade</h2>
            <p>
              Você é responsável pela precisão das entradas adicionadas. Não envie materiais ilegais, discriminatórios ou protegidos por direitos
              autorais sem autorização. Ao compartilhar logs ou capturas, garanta o consentimento dos participantes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Justiça e verificação</h2>
            <p>
              Oferecemos recursos de aleatoriedade verificável, mas a responsabilidade pela conformidade do sorteio é sua. Registre giros, publique regras
              e mantenha logs conforme a legislação local.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Pagamentos e upgrades</h2>
            <p>
              A maioria dos recursos é gratuita. Caso ofereçamos planos pagos, exibiremos preços antes da contratação. Taxas pagas não são reembolsáveis,
              salvo exigência legal. Tributos e encargos de processamento são de sua responsabilidade.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Disponibilidade</h2>
            <p>
              Buscamos alta disponibilidade, mas o serviço pode ser suspenso para manutenção, segurança ou força maior. Não somos responsáveis por perdas
              decorrentes de indisponibilidade. Guarde cópias locais de roletas e logs críticos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Usos proibidos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usar o Sorteador para jogos de azar em localidades onde isso não é permitido.</li>
              <li>Automatizar spam ou tentar manipular provas de aleatoriedade.</li>
              <li>Distribuir malware, realizar scraping excessivo ou atacar nossa infraestrutura.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Isenções</h2>
            <p>
              O Sorteador é fornecido “no estado em que se encontra”. Não garantimos comerciabilidade, adequação a um propósito específico ou ausência de violações.
              Não nos responsabilizamos por danos indiretos ou consequenciais.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar o acesso em caso de violação. Você pode deixar de usar o Sorteador a qualquer momento. As seções sobre isenções,
              responsabilidade e legislação aplicável permanecem válidas após o término.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">11. Legislação aplicável</h2>
            <p>
              Estes termos são regidos pelas leis dos Estados Unidos e do estado de Delaware, salvo proteções obrigatórias do consumidor na sua região.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">12. Contato</h2>
            <p>
              Em caso de dúvidas, escreva para <a href="mailto:terms@allwheel.click" className="text-primary hover:underline">terms@allwheel.click</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;


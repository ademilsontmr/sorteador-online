import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Política de Privacidade - Sorteador"
        description="Entenda como o Sorteador trata dados, registros de sorteios e práticas de segurança."
        canonical="https://sorteador.click/privacidade"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-8">
          Vigente a partir de: 18 de janeiro de 2026
        </p>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Visão geral</h2>
            <p>
              O Sorteador foi criado para garantir decisões justas sem colocar seus dados em risco. As ferramentas rodam no seu navegador,
              portanto entradas, giros e registros aleatórios permanecem com você, a menos que decida exportá-los. Este documento detalha
              quais dados mínimos coletamos, como os usamos e quais são as suas opções.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Dados que processamos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Telemetria de uso (opcional):</strong> métricas anônimas como recursos ativados e tipo de dispositivo para detectar falhas.</li>
              <li><strong>Mensagens de suporte:</strong> quando você nos envia um e-mail, guardamos a conversa para responder e melhorar a documentação.</li>
              <li><strong>Logs exportados:</strong> gerados apenas no seu dispositivo; só recebemos cópias se você as enviar voluntariamente.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. O que nunca coletamos</h2>
            <p>
              O Sorteador <strong>não</strong> armazena listas de participantes, itens da roleta ou resultados em servidores próprios.
              Não utilizamos cookies para publicidade, não vendemos dados pessoais e não incorporamos scripts de analytics de terceiros.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Armazenamento local</h2>
            <p>
              Ao salvar uma roleta, o navegador guarda essa configuração no armazenamento local. Você pode limpar os dados nas
              configurações do navegador ou usando o botão “Limpar tudo” dentro do Sorteador. Ninguém acessa essas entradas sem o seu dispositivo.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Logs exportados e conformidade</h2>
            <p>Ao exportar um log verificável:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>O arquivo permanece no seu computador; jamais fazemos upload automático.</li>
              <li>Você decide se quer compartilhá-lo com auditores, participantes ou órgãos reguladores.</li>
              <li>Excluir o arquivo remove a evidência; o Sorteador não consegue restaurá-lo.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Serviços de terceiros</h2>
            <p>
              Utilizamos provedores renomados (como Vercel e Cloudflare) para hospedar assets estáticos. Eles podem registrar IPs em logs
              padrão por motivos de segurança e controle de tráfego. Esses registros são rotacionados automaticamente e não se relacionam às suas entradas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">7. Seus direitos</h2>
            <p>
              De acordo com GDPR, CCPA ou LGPD, você pode solicitar acesso, correção ou exclusão dos dados que mantemos (principalmente mensagens de suporte).
              Escreva para privacy@allwheel.click e responderemos em até 30 dias.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">8. Retenção de dados</h2>
            <p>
              Conversas de suporte são armazenadas por até 24 meses para facilitar investigações recorrentes. A telemetria opcional é agregada e anonimizada em até 30 dias.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">9. Práticas de segurança</h2>
            <p>
              Aplicamos HTTPS em todo o site, revisamos dependências com frequência e executamos varreduras automáticas antes de cada atualização.
              O programa de divulgação responsável estará disponível em breve — reporte vulnerabilidades para security@allwheel.click.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">10. Atualizações desta política</h2>
            <p>
              Mudanças relevantes serão anunciadas no app e no blog. Continuar usando o serviço após as alterações significa aceitar os novos termos.
            </p>
          </div>

          <div className="pt-4">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contato</h2>
            <p>
              Escreva para <a href="mailto:privacy@allwheel.click" className="text-primary hover:underline">privacy@allwheel.click</a> em caso de dúvidas sobre privacidade.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


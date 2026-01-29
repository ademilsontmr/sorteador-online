import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(process.cwd());
const blogPostsPath = path.join(projectRoot, 'src', 'data', 'blog-posts.ts');
const reportPath = path.join(projectRoot, 'scripts', 'wordcount-report.json');

// Templates por cluster (padrão)
const CLUSTER_TEMPLATES = {
  roleta: {
    pillar: '/blog/guia-completo-roleta-2026',
    intro: 'A roleta online evoluiu para se tornar uma ferramenta essencial para sorteios justos e transparentes.',
    use: 'Use a roleta para escolher vencedores, formar equipes ou tomar decisões imparciais.',
    practices: 'Limpe duplicatas, configure cores e sons, e compartilhe o resultado para transparência.',
    faq: [
      { q: 'A roleta e justa?', a: 'Sim! Usa Web Crypto API para aleatoriedade verdadeira.' },
      { q: 'Posso personalizar?', a: 'Sim! Cores, sons e animações sao totalmente ajustaveis.' }
    ]
  },
  gerador: {
    pillar: '/blog/guia-completo-gerador-numeros-aleatorios',
    intro: 'O gerador de numeros oferece aleatoriedade segura e instantaneia para qualquer necessidade.',
    use: 'Gere numeros para rifas, loterias, testes ou decisoes rapidas.',
    practices: 'Defina o intervalo, escolha repeticao e exporte o resultado para auditoria.',
    faq: [
      { q: 'E realmente aleatorio?', a: 'Sim! Usa Web Crypto API do navegador.' },
      { q: 'Posso gerar varios numeros?', a: 'Sim! Escolha a quantidade e o intervalo.' }
    ]
  },
  selecionador: {
    pillar: '/blog/guia-completo-selecionador-nomes-2026',
    intro: 'O selecionador de nomes permite sorteios justos e transparentes sem cadastro.',
    use: 'Sorteie apresentadores, forme equipes ou escolha ganhadores de forma imparcial.',
    practices: 'Importe listas, remova duplicatas automaticamente e compartilhe o resultado.',
    faq: [
      { q: 'Meus dados sao seguros?', a: 'Sim! Tudo roda localmente no seu navegador.' },
      { q: 'Posso usar sem login?', a: 'Sim! 100% gratuito e sem cadastro.' }
    ]
  },
  jogos: {
    pillar: '/blog/tendencias-sorteios-jogos-online-2026',
    intro: 'Jogos online com sorteios oferecem diversao e oportunidades justas para todos.',
    use: 'Crie game shows, dinamicas de grupo ou jogos educativos com sorteios.',
    practices: 'Configure regras claras, use animacoes e mantenha a transparencia.',
    faq: [
      { q: 'Sao seguros?', a: 'Sim! Algoritmos validados e auditaveis.' },
      { q: 'Posso personalizar?', a: 'Sim! Cores, sons e regras ajustaveis.' }
    ]
  },
  enterprise: {
    pillar: '/blog/enterprise-randomizer-governance-2026',
    intro: 'Solucoes empresariais para sorteios justos e compliance corporativo.',
    use: 'Sorteios de beneficios, formacao de equipes, decisoes de equipe.',
    practices: 'Documente processos, mantenha auditoria e siga compliance.',
    faq: [
      { q: 'Atende LGPD?', a: 'Sim! Processamento local e zero coleta de dados.' },
      { q: 'Suporta auditoria?', a: 'Sim! Logs completos e exportaveis.' }
    ]
  },
  education: {
    pillar: '/blog/classroom-randomizer-roadmap-2026',
    intro: 'Ferramentas educacionais para sorteios justos e dinamicas engajadoras.',
    use: 'Selecao de apresentadores, formacao de grupos, exercicios aleatorios.',
    practices: 'Use em sala de aula, mantenha justica e envolva os alunos.',
    faq: [
      { q: 'Funciona offline?', a: 'Sim! Tudo roda localmente.' },
      { q: 'E adequado para escolas?', a: 'Sim! Privacidade total e sem cadastro.' }
    ]
  },
  social: {
    pillar: '/blog/como-fazer-sorteio-instagram-gratis-seguro-2026',
    intro: 'Sorteios em redes sociais com transparencia e conformidade.',
    use: 'Instagram, YouTube, TikTok, WhatsApp com provas publicas.',
    practices: 'Transmita ao vivo, exporte logs e siga as regras das plataformas.',
    faq: [
      { q: 'E seguro para Instagram?', a: 'Sim! Conforme com diretrizes da plataforma.' },
      { q: 'Preciso transmitir?', a: 'Recomendado para maior transparencia.' }
    ]
  },
  events: {
    pillar: '/blog/como-fazer-rifa-online-beneficente-legal',
    intro: 'Organizacao de eventos e rifas com transparencia e legalidade.',
    use: 'Amigo secreto, sorteios de premios, eventos corporativos.',
    practices: 'Documente regulamentos, use provas publicas e mantenha auditoria.',
    faq: [
      { q: 'E legal para rifas?', a: 'Sim! Segue legislacao vigente.' },
      { q: 'Posso usar para eventos?', a: 'Sim! Ideal para qualquer tipo de evento.' }
    ]
  }
};

// Detectar cluster baseado em palavras-chave no slug
function detectCluster(slug) {
  if (slug.includes('roleta') || slug.includes('wheel')) return 'roleta';
  if (slug.includes('gerador') || slug.includes('numero')) return 'gerador';
  if (slug.includes('selecionador') || slug.includes('nome')) return 'selecionador';
  if (slug.includes('jogo') || slug.includes('bingo') || slug.includes('loteria')) return 'jogos';
  if (slug.includes('enterprise') || slug.includes('corporativo') || slug.includes('governance')) return 'enterprise';
  if (slug.includes('classroom') || slug.includes('escola') || slug.includes('educacao') || slug.includes('aluno')) return 'education';
  if (slug.includes('instagram') || slug.includes('youtube') || slug.includes('tiktok') || slug.includes('whatsapp') || slug.includes('social')) return 'social';
  if (slug.includes('rifa') || slug.includes('amigo-secreto') || slug.includes('evento') || slug.includes('natal')) return 'events';
  return 'roleta'; // default
}

function generateExpandedContent(slug, cluster) {
  const template = CLUSTER_TEMPLATES[cluster];
  const faqItems = template.faq.map(item => `- **${item.q}** ${item.a}`).join('\n');
  
  return `
${template.intro}

## Como Usar

${template.use}

## Boas Praticas

${template.practices}

## Perguntas Frequentes

${faqItems}

---

**Saiba mais**: Para recursos avantados e guias completos, confira nosso [guia principal](${template.pillar}).
  `.trim();
}

function extractPostContent(fileContent, slug) {
  const slugNeedle = `slug: "${slug}"`;
  const slugIndex = fileContent.indexOf(slugNeedle);
  if (slugIndex === -1) return null;

  const contentNeedle = 'content: `';
  const contentStart = fileContent.indexOf(contentNeedle, slugIndex);
  if (contentStart === -1) return null;

  const startPos = contentStart + contentNeedle.length;
  const closeRegex = /\n\s*`,/g;
  closeRegex.lastIndex = startPos;
  const closeMatch = closeRegex.exec(fileContent);
  if (!closeMatch) return null;

  const endPos = closeMatch.index;
  return fileContent.slice(startPos, endPos);
}

function replacePostContent(fileContent, slug, newContent) {
  const slugNeedle = `slug: "${slug}"`;
  const slugIndex = fileContent.indexOf(slugNeedle);
  if (slugIndex === -1) return fileContent;

  const contentNeedle = 'content: `';
  const contentStart = fileContent.indexOf(contentNeedle, slugIndex);
  if (contentStart === -1) return fileContent;

  const startPos = contentStart + contentNeedle.length;
  const closeRegex = /\n\s*`,/g;
  closeRegex.lastIndex = startPos;
  const closeMatch = closeRegex.exec(fileContent);
  if (!closeMatch) return fileContent;

  const endPos = closeMatch.index;
  const before = fileContent.slice(0, startPos);
  const after = fileContent.slice(endPos);
  
  return before + newContent + after;
}

function main() {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const below400 = report.below400;
  
  console.log(`Found ${below400.length} posts below 400 words`);
  
  const fileContent = fs.readFileSync(blogPostsPath, 'utf8');
  let modifiedContent = fileContent;
  let updatedCount = 0;
  
  for (const post of below400) {
    const cluster = detectCluster(post.slug);
    const currentContent = extractPostContent(modifiedContent, post.slug);
    
    if (!currentContent) {
      console.warn(`Could not extract content for ${post.slug}`);
      continue;
    }
    
    const wordCount = post.words;
    if (wordCount >= 400) {
      console.log(`Skipping ${post.slug} (${wordCount} words)`);
      continue;
    }
    
    const newContent = generateExpandedContent(post.slug, cluster);
    modifiedContent = replacePostContent(modifiedContent, post.slug, newContent);
    updatedCount++;
    
    console.log(`✓ Expanded ${post.slug} (${wordCount} → ${newContent.split(/\s+/).length} words)`);
  }
  
  if (updatedCount > 0) {
    fs.writeFileSync(blogPostsPath, modifiedContent, 'utf8');
    console.log(`\nUpdated ${updatedCount} posts successfully!`);
    console.log('\nNext steps:');
    console.log('1. Check git diff to review changes');
    console.log('2. Test the blog locally');
    console.log('3. Commit the changes');
  } else {
    console.log('No posts needed expansion');
  }
}

main();

import fs from 'fs';
import path from 'path';

// Mapeamento de clusters e suas páginas pilares
const CLUSTER_PILLARS = {
  roleta: 'guia-completo-roleta-2026',
  gerador: 'guia-completo-gerador-numeros-aleatorios',
  selecionador: 'guia-completo-selecionador-nomes-2026',
  jogos: 'tendencias-sorteios-jogos-online-2026',
  enterprise: 'enterprise-randomizer-governance-2026',
  education: 'hybrid-team-randomizer-playbook-2026'
};

// Mapeamento de posts satélites para seus clusters
const SATELLITE_CLUSTERS = {
  // Cluster Roleta
  'roleta-online-gratis-2026': 'roleta',
  'roleta-gratis-online-sem-cadastro-2026': 'roleta',
  'roleta-visual-envolvente-selecao-aleatoria-2026': 'roleta',
  'roleta-animacao-confete-ferramenta-gratis-online-2026': 'roleta',
  'roleta-efeitos-sonoros-ferramenta-gratis-online-2026': 'roleta',
  'roleta-sem-anuncios-2026': 'roleta',
  'aplicativo-girar-roleta-gratis-online-2026': 'roleta',
  'criador-de-roletas-online-2026': 'roleta',
  'criador-roleta-ferramenta-gratis-online-2026': 'roleta',
  'criador-roleta-personalizada-ferramenta-gratis-online-2026': 'roleta',
  'ferramenta-gerador-roleta-gratis-online-2026': 'roleta',
  'ferramenta-roleta-online-gratis-2026': 'roleta',
  'gerador-roleta-ferramenta-gratis-online-2026': 'roleta',
  'girar-roleta-ferramenta-gratis-online-2026': 'roleta',
  'gire-a-roleta-online': 'roleta',
  'guia-desafios-girar-roleta-2026': 'roleta',
  'guia-roleta-de-personagens-2026': 'roleta',
  'guia-roleta-nomes-personalizados-2026': 'roleta',
  'guia-roleta-obs-streaming': 'roleta',
  'jogo-de-roleta-online-gratis': 'roleta',
  'onde-encontrar-roleta-online': 'roleta',
  'roleta-1-a-100-online': 'roleta',
  'roleta-aleatoria-ferramenta-gratis-online-2026': 'roleta',
  'roleta-cartas-clash-royale': 'roleta',
  'roleta-clash-royale-online': 'roleta',
  'roleta-com-nomes-online-2026': 'roleta',
  'roleta-de-acordes': 'roleta',
  'roleta-de-cores-online': 'roleta',
  'roleta-de-decisoes-de-carreira': 'roleta',
  'roleta-de-escolhas': 'roleta',
  'roleta-de-fantasias-online': 'roleta',
  'roleta-de-generos': 'roleta',
  'roleta-de-personagens-online': 'roleta',
  'roleta-de-restaurantes': 'roleta',
  'roleta-game-show-online': 'roleta',
  'roleta-para-sorteios-e-rifas': 'roleta',
  'roleta-personalizada-online-2026': 'roleta',
  'roleta-preferia-isso-ou-aquilo': 'roleta',
  'roleta-proximo-livro-ou-serie': 'roleta',
  'roleta-seletora-de-cores-2026': 'roleta',
  'roleta-times-futebol-americano': 'roleta',
  'roleta-visual-envolvente-2026': 'roleta',
  'roleta-para-sorteios-no-instagram': 'roleta',
  'roleta-para-sorteios-no-youtube': 'roleta',
  'roleta-o-que-desenhar': 'roleta',
  'roda-da-fortuna-gratis-2026': 'roleta',
  'roda-da-fortuna-online-2026': 'roleta',
  'roda-da-sorte-online': 'roleta',
  'roda-de-cores-aleatorias': 'roleta',
  'roda-de-decisoes': 'roleta',
  'roda-de-decisoes-online': 'roleta',
  'roda-de-desafios': 'roleta',
  'roda-geradora-de-numeros-aleatorios': 'roleta',
  'roletas-personalizadas-2026': 'roleta',
  'roleta-online-livre-2026': 'roleta',
  'qual-cor-escolher-roleta': 'roleta',
  'playlist-roleta-de-musicas': 'roleta',
  'roleta-onde-viajar': 'roleta',
  'verdade-ou-desafio-online': 'roleta',
  
  // Cluster Gerador
  'gerador-de-numeros-instantaneo': 'gerador',
  'gerador-de-times-instantaneo': 'gerador',
  'gerador-de-times-aleatorios': 'gerador',
  'gerador-de-letras-aleatorias': 'gerador',
  'gerador-numeros-online-2026': 'gerador',
  'gerar-lista-numeros-1-100': 'gerador',
  'gerador-sim-ou-nao': 'gerador',
  'gerador-de-times-rapido': 'gerador',
  'randomizador-numerico-online-2026': 'gerador',
  'sortear-multiplos-numeros-rifa-2026': 'gerador',
  'guia-justo-selecao-de-numeros-2026': 'gerador',
  
  // Cluster Selecionador de Nomes
  'comparativo-roleta-nomes-vs-roleta-completo': 'selecionador',
  'comparativo-wheel-of-names-vs-sorteador': 'selecionador',
  'gerador-de-nomes-com-roleta-2026': 'selecionador',
  'guia-roleta-nomes-personalizados-2026': 'selecionador',
  'multilingual-name-picker-strategy-2026': 'selecionador',
  'roleta-com-nomes-online-2026': 'selecionador',
  'roleta-personalizada-de-nomes-2026': 'selecionador',
  'roleta-selecionador-nomes-aleatorios-ferramenta-gratis-online-2026': 'selecionador',
  'roleta-selecionador-nomes-salas-aula-ferramenta-gratis-online-2026': 'selecionador',
  'selecionador-de-nomes-gratis-sem-login': 'selecionador',
  'selecionador-online-gratis-sem-cadastro-2026': 'selecionador',
  'selecionador-com-eliminacao-automatica': 'selecionador',
  'guia-completo-selecionador-nomes-2026': 'selecionador',
  'seletor-aleatorio-de-paises': 'selecionador',
  'seletor-aleatorio-de-cidades': 'selecionador',
  'seletor-aleatorio-de-portas': 'selecionador',
  
  // Cluster Jogos
  'jogo-estilo-roda-da-fortuna': 'jogos',
  'ideias-bingo-cha-de-bebe-cozinha': 'jogos',
  'como-criar-bingo-online-personalizado-gratis': 'jogos',
  'simpatias-ano-novo-sorte-2026': 'jogos',
  
  // Cluster Enterprise
  'enterprise-randomizer-governance-2026': 'enterprise',
  'giveaway-compliance-checklist-2026': 'enterprise',
  'api-sorteio-desenvolvedores-integracao': 'enterprise',
  'secure-classroom-number-draw-checklist-2026': 'enterprise',
  'como-sortear-equipes-team-building-estrategias': 'enterprise',
  'hybrid-team-randomizer-playbook-2026': 'enterprise',
  
  // Cluster Education
  'classroom-randomizer-roadmap-2026': 'education',
  'como-sortear-alunos-apresentacao-sem-ansiedade': 'education',
  'multilingual-name-picker-strategy-2026': 'education',
  
  // Cluster Social
  'como-fazer-sorteio-instagram-gratis-seguro-2026': 'social',
  'como-fazer-sorteio-whatsapp-clientes': 'social',
  'sorteio-instagram-lei-brasil-2026': 'social',
  'regras-sorteio-youtube-tiktok-o-que-pode': 'social',
  'melhores-ferramentas-escolher-ganhador-comentarios': 'social',
  'melhores-apps-sorteio-android-ios-2026': 'social',
  'golpes-sorteio-falso-como-identificar': 'social',
  'como-funciona-algoritmo-sorteio-aleatorio': 'social',
  'como-provar-sorteio-foi-justo': 'social',
  'ai-assisted-wheel-prompts-2026': 'social',
  'interactive-stream-monetization-2026': 'social',
  'live-event-wheel-engagement-guide-2026': 'social',
  'random-decision-trends-2026': 'social',
  
  // Cluster Events
  'como-fazer-rifa-online-beneficente-legal': 'events',
  'sorteio-de-brinquedos-justo-2026': 'events',
  'sorteio-de-natal-justo': 'events',
  'guia-amigo-secreto-justo-2026': 'events',
  'amigo-secreto-sem-email': 'events',
  'sorteador-de-amigo-secreto': 'events',
  'ideias-sorteio-natal-familia-empresa': 'events',
  'ideias-premios-rifa-beneficente-atrair-doadores': 'events',
  'modelos-bilhete-rifa-editar-imprimir': 'events',
  'ideias-sorteio-loja-fisica-atrair-clientes': 'events',
  'regulamento-sorteio-loja-modelo-gratis': 'events',
  'como-fazer-bolao-copa-mundo-futebol': 'events',
  'sorteio-ovo-pascoa-online-justo': 'events'
};

// Função para adicionar links internos ao conteúdo
function addInternalLinks(content, satelliteSlug, cluster) {
  const pillarSlug = CLUSTER_PILLARS[cluster];
  const pillarUrl = `/blog/${pillarSlug}`;
  
  // Verificar se já existe um link para o pilar
  if (content.includes(pillarUrl)) {
    return content;
  }
  
  // Adicionar link no final do conteúdo
  const linkParagraph = `\n\n---\n\n**Saiba mais**: Para recursos avançados e guias completos, confira nosso [guia principal](${pillarUrl}).`;
  
  return content + linkParagraph;
}

// Ler o arquivo de posts
const projectRoot = path.resolve(process.cwd());
const blogPostsPath = path.join(projectRoot, 'src', 'data', 'blog-posts.ts');

if (!fs.existsSync(blogPostsPath)) {
  console.error(`Arquivo não encontrado: ${blogPostsPath}`);
  process.exit(1);
}

let modifiedContent = fs.readFileSync(blogPostsPath, 'utf8');
let changesCount = 0;

// Processar cada post satélite
Object.entries(SATELLITE_CLUSTERS).forEach(([satelliteSlug, cluster]) => {
  const pillarSlug = CLUSTER_PILLARS[cluster];
  
  // Encontrar o post no arquivo usando método mais seguro
  const slugIndex = modifiedContent.indexOf(`slug: "${satelliteSlug}"`);
  if (slugIndex === -1) return;
  
  const contentStart = modifiedContent.indexOf('content: `', slugIndex);
  if (contentStart === -1) return;
  
  const startPos = contentStart + 'content: `'.length;
  const endPos = modifiedContent.indexOf('\n    `,', startPos);
  if (endPos === -1) return;
  
  const currentContent = modifiedContent.slice(startPos, endPos);
  const newContent = addInternalLinks(currentContent, satelliteSlug, cluster);
  
  if (newContent !== currentContent) {
    changesCount++;
    console.log(`✅ Adicionado link interno para: ${satelliteSlug} → ${pillarSlug}`);
    
    // Substituir o conteúdo
    modifiedContent = modifiedContent.slice(0, startPos) + newContent + modifiedContent.slice(endPos);
  }
});

// Salvar o arquivo modificado
if (changesCount > 0) {
  fs.writeFileSync(blogPostsPath, modifiedContent);
  console.log(`\n🎉 Concluído! ${changesCount} posts atualizados com links internos.`);
} else {
  console.log('ℹ️ Nenhum link interno necessário para adicionar.');
}

console.log('\n📊 Estatísticas:');
console.log(`- Posts satélites processados: ${Object.keys(SATELLITE_CLUSTERS).length}`);
console.log(`- Clusters cobertos: ${Object.keys(CLUSTER_PILLARS).length}`);
console.log(`- Mudanças realizadas: ${changesCount}`);

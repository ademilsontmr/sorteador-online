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

// Lista de posts satélites para cada cluster
const SATELLITES = {
  roleta: [
    'roleta-online-gratis-2026',
    'roleta-gratis-online-sem-cadastro-2026',
    'roleta-visual-envolvente-selecao-aleatoria-2026',
    'roleta-animacao-confete-ferramenta-gratis-online-2026',
    'roleta-efeitos-sonoros-ferramenta-gratis-online-2026',
    'roleta-sem-anuncios-2026',
    'aplicativo-girar-roleta-gratis-online-2026',
    'criador-de-roletas-online-2026',
    'criador-roleta-ferramenta-gratis-online-2026',
    'criador-roleta-personalizada-ferramenta-gratis-online-2026'
  ],
  gerador: [
    'gerador-de-numeros-instantaneo',
    'gerador-de-times-aleatorios',
    'gerador-multiplos-numeros-ferramenta-gratis-2026',
    'gerador-numeros-online-2026',
    'gerador-numeros-sem-duplicados-ferramenta-gratis-2026',
    'gerar-lista-numeros-1-100',
    'random-number-generator-practical-use-cases-2026'
  ],
  selecionador: [
    'selecionador-de-nomes-gratis-sem-login',
    'selecionador-de-nomes-multiplos-ferramenta-gratis-2026',
    'selecionador-de-nomes-selecao-justa-ferramenta-gratis-2026',
    'multilingual-name-picker-strategy-2026',
    'comparativo-wheel-of-names-vs-sorteador'
  ],
  jogos: [
    'criar-jogo-online-mega-sena-2026',
    'criar-jogo-online-lotofacil-2026',
    'criar-jogo-online-quina-2026',
    'simulador-quina-mega-sena-funciona-2026',
    'roda-da-fortuna-gratis-2026'
  ],
  enterprise: [
    'como-sortear-equipes-team-building-estrategias',
    'ideias-sorteio-natal-familia-empresa'
  ],
  education: [
    'roleta-para-professores',
    'dinamicas-sorteio-sala-aula-atividades-engajadoras',
    'secure-classroom-number-draw-checklist-2026'
  ]
};

// Ler o arquivo de posts
const blogPostsPath = path.join(process.cwd(), 'src/data/blog-posts.ts');
const fileContent = fs.readFileSync(blogPostsPath, 'utf-8');

let changesCount = 0;

// Processar cada cluster
Object.entries(SATELLITES).forEach(([cluster, satellites]) => {
  const pillarSlug = CLUSTER_PILLARS[cluster];
  
  satellites.forEach(satelliteSlug => {
    // Encontrar o post no arquivo usando uma abordagem mais simples
    const slugIndex = fileContent.indexOf(`slug: "${satelliteSlug}"`);
    
    if (slugIndex !== -1) {
      // Encontrar o início do content
      const contentStart = fileContent.indexOf('content: `', slugIndex);
      if (contentStart !== -1) {
        const contentStartPos = contentStart + 10; // 'content: `'.length
        
        // Encontrar o fim do content
        let contentEnd = contentStartPos;
        let braceCount = 0;
        let inTemplate = true;
        
        for (let i = contentStartPos; i < fileContent.length; i++) {
          const char = fileContent[i];
          if (char === '`' && fileContent[i-1] !== '\\') {
            if (inTemplate) {
              contentEnd = i;
              break;
            }
          }
        }
        
        if (contentEnd > contentStartPos) {
          const content = fileContent.substring(contentStartPos, contentEnd);
          
          // Verificar se já tem link para a pilar
          if (!content.includes(`/blog/${pillarSlug}`)) {
            // Adicionar link no final
            const linkTexts = {
              roleta: 'guia completo da roleta',
              gerador: 'guia completo de geradores de números',
              selecionador: 'guia completo do selecionador de nomes',
              jogos: 'tendências de sorteios e jogos online',
              enterprise: 'governança de randomizadores corporativos',
              education: 'playbook de times híbridos'
            };
            
            const linkText = linkTexts[cluster] || 'guia completo';
            const linkParagraph = `\n\n\n---\n\n**📚 Saiba mais**: Para conhecer todos os recursos e melhores práticas, confira nosso [${linkText}](/blog/${pillarSlug}).`;
            
            const newContent = content + linkParagraph;
            
            // Substituir o conteúdo no arquivo
          const beforeContent = fileContent.substring(0, contentStartPos);
          const afterContent = fileContent.substring(contentEnd);
          const modifiedFile = beforeContent + newContent + afterContent;
          
          fs.writeFileSync(blogPostsPath, modifiedFile);
          
          changesCount++;
          console.log(`✅ Adicionado link interno: ${satelliteSlug} → ${pillarSlug}`);
          
          // Atualizar fileContent para a próxima iteração
          fileContent.length = 0;
          fileContent += modifiedFile;
          }
        }
      }
    }
  });
});

console.log(`\n🎉 Concluído! ${changesCount} posts atualizados com links internos.`);
console.log(`\n📊 Estatísticas:`);
console.log(`- Clusters processados: ${Object.keys(SATELLITES).length}`);
console.log(`- Posts satélites: ${Object.values(SATELLITES).flat().length}`);
console.log(`- Mudanças realizadas: ${changesCount}`);

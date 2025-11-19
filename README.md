# Sorteador – Ferramentas brasileiras para sorteios

Aplicação web pronta para produção e totalmente em português. Com ela você:

- Gira uma roleta animada para decidir tarefas, prêmios ou atividades.
- Sorteia números em qualquer intervalo, com ou sem repetição.
- Escolhe nomes ou itens de uma lista, mantendo histórico e provas do sorteio.

Tudo roda no navegador usando Web Crypto API, ou seja, resultados justos, verificáveis e sem enviar dados para servidores externos.

## 🎯 Recursos principais

### Roleta animada
- Renderização em canvas a 60 fps.
- Entrada simples: um item por linha (cola da planilha ou WhatsApp).
- Cores distintas automáticas e gradientes brasileiros.
- Giro realista com easing, sons e confete ao revelar o vencedor.
- Opção de remover ganhadores para não repetir.

### Sorteio de números
- Intervalo mínimo/máximo configurável.
- Quantidade de números por rodada.
- Alterna entre sorteio com e sem reposição.
- Exibe resultados com destaque e salva histórico local.

### Selecionador de nomes
- Normaliza entradas (trim, dedupe, remove linhas vazias).
- Suporta múltiplos vencedores em um único clique.
- Histórico de até 10 sorteios para auditoria rápida.

## 🛠️ Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router 6
- **Estado assíncrono**: TanStack Query
- **SEO**: react-helmet-async
- **Aleatoriedade**: Web Crypto API (`crypto.getRandomValues`)

## 🎨 Design system
- Tokens definidos em `src/index.css` e `tailwind.config.ts`.
- Gradientes primários inspirados nas cores do Brasil.
- Componentes usam somente variáveis sem cores fixas.

## 📁 Estrutura

```
src/
├── components/          # Header, Footer, SEO, roleta, sorteios
├── data/                # Conteúdo dos cards e blog
├── pages/               # Rotas (home, blog, ferramentas, legal)
├── lib/                 # Sons, utilidades e traduções
└── main.tsx             # Bootstrap da aplicação

public/
├── sitemap.xml          # Gerado via script
└── robots.txt
```

## 🚀 Como rodar

Pré-requisito: Node.js 18+

```bash
git clone <seu-repo>
cd <seu-repo>
npm install
npm run dev
```

Servidor disponível em `http://localhost:8080`.

### Build

```bash
npm run build
```

O resultado otimizado fica em `dist/` e pode ser enviado para Cloudflare Pages, Vercel, Netlify ou qualquer host estático.

## 🔍 SEO
- Títulos e descrições localizados, com canonical `https://sorteador.click`.
- Open Graph + Twitter Card.
- Dados estruturados (Schema WebApplication).
- Sitemap e robots prontos para o domínio brasileiro.

## ⚙️ Personalização
- Ajuste cores em `src/index.css`.
- Edite a paleta da roleta em `src/lib/wheel-colors.ts`.
- Conteúdo do blog fica em `src/data/blog-posts.ts` (Markdown).

## 📄 Licença & contribuição

Projeto originalmente criado via Lovable. Consulte o repositório para detalhes de licença e contribuições. Se quiser propor melhorias, abra uma issue ou PR descrevendo o ajuste desejado.

# Google AdSense - Configuração

## ✅ O que foi implementado:

1. **Script do AdSense** adicionado no `index.html`
2. **Componente AdSense** criado em `src/components/AdSense.tsx`
3. **Anúncios** adicionados nas páginas de artigos do blog

## 🔧 Como configurar:

### Passo 1: Obter o Publisher ID do Google AdSense

1. Acesse: https://www.google.com/adsense
2. Faça login na sua conta
3. Vá em **Sites** > **Ad units**
4. Copie seu **Publisher ID** (formato: `ca-pub-XXXXXXXXXX`)

### Passo 2: Substituir no código

#### No arquivo `index.html`:
```html
<!-- Substitua YOUR_PUBLISHER_ID pelo seu Publisher ID -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU_PUBLISHER_ID" crossorigin="anonymous"></script>
```

#### No arquivo `src/components/AdSense.tsx`:
```typescript
// Linha 25: Substitua YOUR_PUBLISHER_ID
data-ad-client="ca-pub-SEU_PUBLISHER_ID"
```

### Passo 3: Criar unidades de anúncio

1. No Google AdSense, vá em **Sites** > **Ad units**
2. Clique em **+ New ad unit**
3. Escolha o formato (recomendado: **Display ads** > **Responsive**)
4. Copie o **Ad unit ID** (formato: `1234567890`)

### Passo 4: Adicionar Ad Unit ID nas páginas

#### No arquivo `src/pages/BlogPost.tsx`:
```typescript
<AdSense
  adSlot="SEU_AD_UNIT_ID"  // Substitua pelo Ad Unit ID
  adFormat="auto"
  fullWidthResponsive={true}
  className="min-h-[250px]"
/>
```

## 📍 Onde os anúncios aparecem:

- **Páginas de artigos do blog**: Após o conteúdo do artigo, antes da seção "Keep Reading"

## 🎨 Personalização:

Você pode adicionar anúncios em outras páginas também:

```typescript
import { AdSense } from "@/components/AdSense";

// Exemplo: Adicionar na página inicial
<AdSense
  adSlot="SEU_AD_UNIT_ID"
  adFormat="auto"
  fullWidthResponsive={true}
/>
```

## ⚠️ Importante:

1. **Aguarde aprovação do Google AdSense** antes de ativar os anúncios
2. **Não clique nos seus próprios anúncios** (viola as políticas)
3. **Teste em produção** após a aprovação
4. **Monitore o desempenho** no painel do AdSense

## 🔍 Verificação:

Após configurar, verifique:
- Script do AdSense carregando no console do navegador
- Anúncios aparecendo nas páginas de artigos
- Sem erros no console

## 📚 Documentação oficial:

- https://support.google.com/adsense
- https://support.google.com/adsense/answer/7183212


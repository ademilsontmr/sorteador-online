import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string | string[];
  structuredData?: object;
}

export const SEO = ({
  title = "Sorteador — roleta, números e nomes online",
  description = "Sorteador Online 100% Grátis! Faça sorteios de números, nomes e gire a roleta. Ferramenta rápida, segura e sem cadastro. Ideal para Instagram e rifas.",
  canonical = "https://sorteador.click/",
  ogImage = "https://sorteador.click/og-image.png",
  keywords,
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes("Sorteador") ? title : `${title} — Sorteador`;
  const keywordsContent = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordsContent && <meta name="keywords" content={keywordsContent} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

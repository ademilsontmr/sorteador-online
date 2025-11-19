const categoryTranslations: Record<string, string> = {
  Enterprise: "Corporativo",
  Events: "Eventos",
  Innovation: "Inovação",
  Education: "Educação",
  Security: "Segurança",
  General: "Geral",
};

export const getCategoryLabel = (category: string) =>
  categoryTranslations[category] ?? category;




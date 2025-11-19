import { Hash, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ToolConfig {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  path: string;
  iconBgClass: string;
  bulletClass: string;
}

export const tools: ToolConfig[] = [
  {
    id: "wheel",
    icon: Sparkles,
    title: "Gire a Roleta",
    description:
      "Uma forma visual e envolvente de fazer seleções aleatórias. Perfeita para sorteios e decisões divertidas.",
    features: [
      "Itens ilimitados",
      "Efeitos sonoros",
      "Animação de confetes",
      "Opção de remover vencedores",
    ],
    path: "/roleta",
    iconBgClass: "gradient-primary",
    bulletClass: "bg-primary",
  },
  {
    id: "numbers",
    icon: Hash,
    title: "Sorteador de Números",
    description:
      "Gere números aleatórios em qualquer intervalo. Ideal para loterias e rifas.",
    features: ["Intervalo personalizado", "Múltiplos números", "Sem duplicados", "Resultados instantâneos"],
    path: "/gerador-de-numeros",
    iconBgClass: "gradient-accent",
    bulletClass: "bg-accent",
  },
  {
    id: "names",
    icon: Users,
    title: "Sorteador de Nomes",
    description:
      "Selecione nomes aleatórios da sua lista. Ótimo para atividades em sala e seleção de equipes.",
    features: ["Escolha múltipla", "Seleção justa", "Configuração rápida", "Resultados claros"],
    path: "/selecionador-de-nomes",
    iconBgClass: "bg-success",
    bulletClass: "bg-success",
  },
];


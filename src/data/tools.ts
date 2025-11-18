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
    title: "Spin the Wheel",
    description:
      "Visual and engaging way to make random selections. Perfect for giveaways and fun decisions.",
    features: [
      "Unlimited items",
      "Sound effects",
      "Confetti animation",
      "Remove winner option",
    ],
    path: "/spin-wheel",
    iconBgClass: "gradient-primary",
    bulletClass: "bg-primary",
  },
  {
    id: "numbers",
    icon: Hash,
    title: "Number Generator",
    description:
      "Generate random numbers within any range. Ideal for lottery draws and raffles.",
    features: ["Custom range", "Multiple numbers", "No duplicates", "Instant results"],
    path: "/number-generator",
    iconBgClass: "gradient-accent",
    bulletClass: "bg-accent",
  },
  {
    id: "names",
    icon: Users,
    title: "Name Picker",
    description:
      "Randomly select names from your list. Great for classroom activities and team selection.",
    features: ["Pick multiple", "Fair selection", "Quick setup", "Clear results"],
    path: "/name-picker",
    iconBgClass: "bg-success",
    bulletClass: "bg-success",
  },
];


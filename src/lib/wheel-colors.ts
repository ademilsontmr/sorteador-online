// Vibrant, distinct color palette for wheel slices
export const WHEEL_COLORS = [
  "#8B5CF6", // Purple
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#F97316", // Orange
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#6366F1", // Indigo
];

export const getWheelColor = (index: number): string => {
  return WHEEL_COLORS[index % WHEEL_COLORS.length];
};

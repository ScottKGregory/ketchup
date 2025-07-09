export type Alignment = "left" | "right" | "center" | "justify" | undefined;

export const TextAlignment = (align: Alignment): string => {
  switch (align) {
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    case "center":
      return "text-center";
    case "justify":
      return "text-justify";
    default:
      return "text-left";
  }
};

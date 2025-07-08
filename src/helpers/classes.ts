export const TextAlignment = (
  align: "left" | "right" | "center" | undefined,
): string => {
  switch (align) {
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    case "center":
      return "text-center";
    default:
      return "text-left";
  }
};

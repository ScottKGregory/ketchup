export type Alignment = "left" | "right" | "center" | "justify" | undefined;
export type Size = "2xl" | "xl" | "lg" | "md" | "sm" | "xs" | undefined;

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

export const Padding = (size: Size): string => {
  switch (size) {
    case "2xl":
      return "p-32";
    case "xl":
      return "p-16";
    case "lg":
      return "p-8";
    case "md":
      return "p-4";
    case "sm":
      return "p-2";
    case "xs":
      return "p-1";
    default:
      return "p-4";
  }
};

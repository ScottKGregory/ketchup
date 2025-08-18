export type Alignment = "left" | "right" | "center" | "justify" | undefined;
export type Size =
  | "4xl"
  | "3xl"
  | "2xl"
  | "xl"
  | "lg"
  | "md"
  | "sm"
  | "xs"
  | undefined;
export type Colour =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "black"
  | "white"
  | "primary";

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

export const Padding = (size: Size, prefix: string = "p"): string => {
  switch (size) {
    case "2xl":
      return `${prefix}-32`;
    case "xl":
      return `${prefix}-16`;
    case "lg":
      return `${prefix}-8`;
    case "md":
      return `${prefix}-4`;
    case "sm":
      return `${prefix}-2`;
    case "xs":
      return `${prefix}-1`;
    default:
      return `${prefix}-4`;
  }
};

export const TextSize = (size: Size): string => {
  switch (size) {
    case "4xl":
      return "text-4xl";
    case "3xl":
      return "text-3xl";
    case "2xl":
      return "text-2xl";
    case "xl":
      return "text-xl";
    case "lg":
      return "text-lg";
    case "md":
      return "text-md";
    case "sm":
      return "text-sm";
    case "xs":
      return "text-xs";
    default:
      return "";
  }
};

export const GetColour = (
  prefix: "text" | "bg",
  colour?: Colour,
  shade?: string | number,
) => {
  if (!colour) {
    return "";
  }

  if (shade && colour !== "white" && colour !== "black") {
    return `${prefix}-${colour}-${shade}`;
  }

  return `${prefix}-${colour}`;
};

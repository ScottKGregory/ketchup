import { type ReactNode } from "react";
import Icon, { type Props as IconProps } from "./icon";
import { GetColour, type Colour } from "../helpers/classes";
import classNames from "classnames";
import Typography from "./typography";

interface Props {
  events: (Event | undefined | null)[];
}

export interface Tag {
  text: string;
  colour?: Colour;
}

export interface Event {
  icon: IconProps;
  title: string;
  subtitle?: string;
  body?: string | ReactNode;
  tags?: Tag[];
}

export default function Timeline(props: Props) {
  const tagClasses = (colour?: Colour) => {
    return [
      `${GetColour("bg", colour ?? "primary", 100)}`,
      `${GetColour("text", colour ?? "primary", 800)}`,
      `dark:${GetColour("bg", colour ?? "primary", 900)}`,
      `dark:${colour !== "white" && colour !== "black" ? GetColour("text", colour ?? "primary", 300) : colour === "black" ? "text-white" : "text-gray-900"}`,
    ];
  };

  return (
    <ol className="relative ml-4 border-s border-gray-200 dark:border-gray-700">
      {props.events
        .filter((e) => !!e)
        .map((e) => (
          <li className="mb-10 ms-8">
            <span
              className={classNames(
                "absolute -start-4 flex h-8 w-8 items-center justify-center rounded-sm",
                tagClasses(e.icon.iconColour),
              )}
            >
              <Icon {...e.icon} />
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              {e.title}{" "}
              {e.tags?.map((t) => (
                <span
                  className={classNames(
                    "me-1 ms-1 rounded-sm px-2.5 py-0.5 text-sm font-medium first-of-type:ms-3",
                    tagClasses(t.colour),
                  )}
                >
                  {t.text}
                </span>
              ))}
            </h3>
            {e.subtitle && (
              <Typography
                type="p"
                size="sm"
                className="mb-2 block leading-none"
              >
                {e.subtitle}
              </Typography>
            )}
            {e.body && (
              <Typography type="p" className="mb-4">
                {e.body}
              </Typography>
            )}
          </li>
        ))}
    </ol>
  );
}

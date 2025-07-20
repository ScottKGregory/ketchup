import { type ReactNode } from "react";
import Icon, { type Props as IconProps } from "./icon";

interface Props {
  events: (Event | undefined | null)[];
}

export interface Event {
  icon: IconProps;
  title: string;
  subtitle?: string;
  body?: string | ReactNode;
  tag?: string;
}

export default function Timeline(props: Props) {
  return (
    <ol className="relative ml-4 border-s border-gray-200 dark:border-gray-700">
      {props.events
        .filter((e) => !!e)
        .map((e) => (
          <li className="mb-10 ms-8">
            <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded bg-primary-100 dark:bg-primary-900 dark:text-white">
              <Icon {...e.icon} />
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
              {e.title}{" "}
              {e.tag && (
                <span className="me-2 ms-3 rounded bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                  {e.tag}
                </span>
              )}
            </h3>
            {e.subtitle && (
              <div className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {e.subtitle}
              </div>
            )}
            {e.body && (
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {e.body}
              </p>
            )}
          </li>
        ))}
    </ol>
  );
}

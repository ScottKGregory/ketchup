import classNames from "classnames";
import Typography from "./typography";
import Icon from "./icon";

interface Link {
  title: string;
  to: string;
  active?: boolean;
}

interface Props {
  links: Link[];
  heading: string;
  logoSrc: string;
}

export default function Navbar(props: Props) {
  return (
    <nav className="sticky start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={props.logoSrc} className="h-8" />
          <Typography
            type="span"
            bold
            className="self-center whitespace-nowrap text-2xl"
          >
            {props.heading}
          </Typography>
        </a>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <a href="">
            <Typography>
              <Icon icon="right-to-bracket" />
            </Typography>
          </a>
        </div>
        <div className="order-1 flex w-full items-center justify-between md:w-auto">
          <ul className="mt-0 flex flex-row space-x-8 rounded-lg border-0 p-0 font-medium rtl:space-x-reverse">
            {props.links.map((link) => (
              <li key={link.title + link.to}>
                <Typography type="span">
                  {" "}
                  <a
                    href={link.to}
                    className={classNames({
                      "block rounded-sm bg-transparent p-0 text-primary-600":
                        link.active,
                      "block rounded-sm p-0 text-gray-900 hover:text-primary-600 dark:text-gray-100":
                        !link.active,
                    })}
                  >
                    {link.title}
                  </a>
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

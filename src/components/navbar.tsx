import classNames from "classnames";
import Button from "./button";

interface Link {
  title: string;
  to: string;
  active?: boolean;
}

interface Props {
  links: Link[];
}

export default function Navbar(props: Props) {
  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="public/ketchup.png" className="h-8" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            Ketchup
          </span>
        </a>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <Button text="Login" />
        </div>
        <div className="order-1 flex w-full items-center justify-between md:w-auto">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
            {props.links.map((link) => (
              <li key={link.title + link.to}>
                <a
                  href={link.to}
                  className={classNames({
                    "block rounded-sm bg-red-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-red-700":
                      link.active,
                    "block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-red-700":
                      !link.active,
                  })}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

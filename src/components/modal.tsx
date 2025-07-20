import { type PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { type Props as IconProps } from "./icon";
import Button from "./button";
import Card from "./card";
import Typography from "./typography";
import { animated, useTransition } from "@react-spring/web";

export interface Props {
  icon?: IconProps;
  linkText?: string;
  header: string;
}

export default function PortalExample(props: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);

  const transitions = useTransition(open, {
    expires: 0,
    from: { opacity: 0, transform: "translatey(-5rem)" },
    enter: { opacity: 1, transform: "translatey(0)" },
    leave: { opacity: 0, transform: "translatey(-5rem)" },
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  return (
    <>
      {(props.icon || props.linkText) && (
        <Button
          onClick={() => setOpen(true)}
          text={props.linkText}
          icon={props.icon}
        />
      )}
      {createPortal(
        <>
          {open && (
            <div
              className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
          )}

          <div className="no-scrollbar pointer-events-none fixed bottom-0 left-0 top-0 flex h-full w-full flex-col justify-around overflow-auto">
            {transitions(
              (style, item) =>
                item && (
                  <animated.div style={style}>
                    <div className="pointer-events-auto relative mx-auto min-w-96 max-w-[50vw] pb-16 pt-32">
                      <Card padding="lg">
                        <div className="flex w-full justify-between">
                          <Typography type="h2" className="flex-1">
                            {props.header}
                          </Typography>
                          <Button
                            noBackground
                            icon={{ icon: "close", iconPrefix: "fas" }}
                            onClick={() => setOpen(false)}
                          />
                        </div>
                        <div className="flex-1">{props.children}</div>
                      </Card>
                    </div>
                  </animated.div>
                ),
            )}
          </div>
        </>,
        document.body,
      )}
    </>
  );
}

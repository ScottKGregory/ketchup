import { type PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { type Props as IconProps } from "./icon";
import Button from "./button";
import Card from "./card";
import Typography from "./typography";

export interface Props {
  open?: boolean;
  onClose?: () => void;
  icon?: IconProps;
  linkText?: string;
  header: string;
}

export default function PortalExample(props: PropsWithChildren<Props>) {
  useEffect(() => {
    document.body.style.overflow = props.open ? "hidden" : "unset";
  }, [props.open]);

  if (props.open) {
    return createPortal(
      <>
        (
        <div
          className="bg-opacity-40 fixed top-0 left-0 h-full w-full bg-black backdrop-blur-xs"
          onClick={() => {
            if (props.onClose) {
              props.onClose();
            }
          }}
        />
        )
        <div className="no-scrollbar pointer-events-none fixed top-0 bottom-0 left-0 flex h-full w-full flex-col justify-around overflow-auto">
          <div className="pointer-events-auto relative mx-auto max-w-[50vw] min-w-96 pt-32 pb-16">
            <Card padding="xl">
              <div className="flex w-full justify-between">
                <Typography type="h2" className="flex-1">
                  {props.header}
                </Typography>
                <Button
                  className="mt-0 mr-0 pt-0 pr-0"
                  noPadding
                  noBackground
                  icon={{ icon: "close", iconPrefix: "fas" }}
                  onClick={() => {
                    if (props.onClose) {
                      props.onClose();
                    }
                  }}
                />
              </div>
              <div className="flex-1">{props.children}</div>
            </Card>
          </div>
        </div>
      </>,
      document.body,
    );
  }
}

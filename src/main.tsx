import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fasds } from "@fortawesome/sharp-duotone-solid-svg-icons";
import { fasl } from "@fortawesome/sharp-light-svg-icons";
import { fasr } from "@fortawesome/sharp-regular-svg-icons";
import { fass } from "@fortawesome/sharp-solid-svg-icons";
import { fast } from "@fortawesome/sharp-thin-svg-icons";
import { fat } from "@fortawesome/pro-thin-svg-icons";

config.autoAddCss = false;
library.add(fab, fad, fal, far, fas, fasds, fasl, fasr, fass, fast, fat);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { renderToString } from "react-dom/server";
import Home from "./pages/Home";

export function render(): string {
  return renderToString(<Home />);
}

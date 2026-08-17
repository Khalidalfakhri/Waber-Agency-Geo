import { renderToString } from "react-dom/server";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";

export function render(url: string = "/"): string {
  switch (url) {
    case "/services":
      return renderToString(<Services />);
    case "/about":
      return renderToString(<About />);
    case "/contact":
      return renderToString(<Contact />);
    case "/portfolio":
      return renderToString(<Portfolio />);
    default:
      return renderToString(<Home />);
  }
}

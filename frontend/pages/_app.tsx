import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider themes={["default", "contrast"]}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

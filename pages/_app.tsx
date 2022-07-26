import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div id="app-root">
        <Component {...pageProps} />
      </div>
      <div id="app-modal"></div>
    </>
  );
}

export default MyApp;

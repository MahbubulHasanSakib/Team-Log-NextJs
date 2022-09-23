import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import { AppWrapper } from "../components/UserContext";
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    );
  }
}

export default MyApp;

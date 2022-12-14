import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";

import OverrideCssBaseline from "../components/OverrideCssBaseline";
import store from "../reducers/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>League of Scaling</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/pageLogo.png" />
    </Head>
    <Provider store={store}>
      <OverrideCssBaseline Component={Component} pageProps={pageProps} />
    </Provider>
  </>
);

export default appWithTranslation(MyApp);

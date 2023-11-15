import '../styles/globals.css';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import OverrideCssBaseline from '../components/champs/OverrideCssBaseline';
import store from '../reducers/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>League of Scaling</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/pageLogo.png' />
        </Head>
        <Provider store={store}>
            <OverrideCssBaseline Component={Component} pageProps={pageProps} />
        </Provider>
    </>
);

export default appWithTranslation(MyApp);

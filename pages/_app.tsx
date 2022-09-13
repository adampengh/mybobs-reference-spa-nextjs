/*
 * Copyright 2019-2021 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/scss/bootstrap.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './_index.scss';

import '../scss/styles.scss';

config.autoAddCss = false;

export default class MyApp extends App {
  static AppTree: AppTreeType;

  static async getInitialProps(appContext: AppContext): Promise<AppInitialProps> {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    // console.log('[MyApp.getInitialProps]: appProps=', appProps);
    const { AppTree: tree } = appContext;
    MyApp.AppTree = tree;

    return { ...appProps };
  }

  render(): JSX.Element {
    // console.log('[App]: AppProps=', this.props);
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta key="description" name="description" content="Example React SPA for brX SaaS" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#00b2db" />

          <title key="title">Bobs Discount Furniture</title>

          <link rel="apple-touch-icon" href="/logo@2x.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
            crossOrigin="anonymous"
          />
        </Head>
        <div className="d-flex flex-column vh-100">
          <Component {...pageProps} />
        </div>
      </>
    );
  }
}

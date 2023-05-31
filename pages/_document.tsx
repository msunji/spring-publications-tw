import { Html, Main, Head, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme="cupcake">
      <Head>
        <meta property="og:title" content="清泉 - Spring Publications" key="title" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

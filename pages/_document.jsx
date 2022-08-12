import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=BhuTuka+Expanded+One&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body style={{ margin: 0, backgroundColor: '#000000' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

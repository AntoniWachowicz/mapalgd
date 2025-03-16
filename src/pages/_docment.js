import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Preconnect to OpenStreetMap for faster map loading */}
          <link rel="preconnect" href="https://tile.openstreetmap.org" />
          
          {/* Add meta tags */}
          <meta charSet="utf-8" />
          <meta name="description" content="Interactive map application with categorized pins" />
          
          {/* Add favicon */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          {/* Modal container for portals */}
          <div id="modal-root"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
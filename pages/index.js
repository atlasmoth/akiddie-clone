import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="Home">
      <Head>
        <title>Akidie || Clone.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content="An akiddie clone." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <section className="first">
          <div className="container">
            <div className="display">
              <img src="/logo.png" alt="logo" />
              <h2>Akidie</h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

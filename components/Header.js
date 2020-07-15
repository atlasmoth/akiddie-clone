import Link from "next/link";
import Head from "next/head";

export default function Header(props) {
  return (
    <>
      <Head>
        <title>Akidie || Clone.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content="An akiddie clone." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="holder">
          <header className="main-header">
            <div className="heading">
              <h1>Akidie</h1>
            </div>
            <nav className="navigation">
              <ul>
                <li>
                  <Link href="/signup">
                    <a>Sign Up</a>
                  </Link>
                </li>
                <li>
                  <Link href="/signin">
                    <a>Sign In</a>
                  </Link>
                </li>
                <li>
                  <Link href="/monographs">
                    <a>books</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          {props.children}
        </div>
        <footer>
          <h4>This is the footer</h4>
        </footer>
      </div>
    </>
  );
}

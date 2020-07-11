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
      <Header>
        <main>
          <section className="first">
            <div className="container">
              <div className="display">
                <img src="/logo.png" alt="logo" />
                <h1>Akidie</h1>
              </div>
              <div className="lede">
                <h2 className="underscore">Lorem Ipsum dolor sit amet</h2>
              </div>
              <div className="register">
                <button>Register</button>
              </div>
            </div>
          </section>
          <section className="second">
            <div className="container">
              <div className="grid">
                <div className="testimonials">
                  <h2 className="underscore">Testimonials</h2>
                </div>
                <div className="message">
                  <div className="message-heading">
                    <img src="/demo.svg" alt="" />
                    <h4>Dum Dum</h4>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                    eos quis quaerat eveniet necessitatibus adipisci ex corrupti
                    iusto quidem nihil labore dolores porro expedita velit
                    aliquid, dolorem iure dolor aperiam!
                  </p>
                </div>
                <div className="message">
                  <div className="message-heading">
                    <img src="/demo.svg" alt="" />
                    <h4>Dum Dum</h4>
                  </div>
                  <p>
                    Tempora eaque similique sapiente, perspiciatis, quae quos
                    doloremque praesentium velit quibusdam sed illum error
                    eligendi illo quam temporibus deserunt asperiores iste,
                    minus molestiae quo. Aliquid maiores inventore animi quaerat
                    fugiat.
                  </p>
                </div>
                <div className="message">
                  <div className="message-heading">
                    <img src="/demo.svg" alt="" />
                    <h4>Dum Dum</h4>
                  </div>
                  <p>
                    Sequi vero quaerat, quis suscipit at delectus esse ipsam
                    molestiae minus velit ea consectetur! Nesciunt dolore porro
                    ad deleniti, error magnam harum quisquam distinctio officia
                    eius id magni, pariatur dolorum!
                  </p>
                </div>
                <div className="message">
                  <div className="message-heading">
                    <img src="/demo.svg" alt="" />
                    <h4>Dum Dum</h4>
                  </div>
                  <p>
                    Qui quidem laborum, soluta fuga, ea quis nemo mollitia
                    eligendi ab delectus numquam, nulla animi sit ex. Aperiam
                    amet sequi accusamus, architecto quos veniam animi, labore
                    magnam eaque eos voluptatum!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Header>
    </div>
  );
}

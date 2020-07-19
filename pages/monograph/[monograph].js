import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

export default function Monograph() {
  const router = useRouter();
  const [state, setState] = useState({ book: {}, success: false });
  useEffect(() => {
    fetch(
      `${location.origin}/books/${location.pathname.split("/monograph/")[1]}`
    )
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        } else {
          throw "error loading page";
        }
      })
      .then(({ success, book }) => {
        setState({ success, book });
      })
      .catch(() => {
        setState({ ...state, success: false });
      });
  }, []);
  return (
    <Header>
      <div className="container">
        {!state.success ? (
          <h1>Fetching data</h1>
        ) : (
          <div className="monograph">
            <div className="poster-info">
              <h2>{state.book.title}</h2>
              <h3>{state.book.genre}</h3>
              <h3>{state.book.isbn}</h3>
              <p>{state.book.description}</p>
            </div>
            <div className="poster">
              <img src={`/${state.book.image}`} alt="poster" />
              <Link href={`/read/[read]`} as={`/read/${state.book._id}`}>
                <a className="read">Read</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Header>
  );
}

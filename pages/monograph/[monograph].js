import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/Header";

export default function Monograph({ book: { book, success } }) {
  const router = useRouter();

  return (
    <Header>
      <div className="container">
        {success && (
          <div className="monograph">
            <div className="poster-info">
              <h2>{book.title}</h2>
              <h3>{book.genre}</h3>
              <h3>{book.isbn}</h3>
              <p>{book.description}</p>
            </div>
            <div className="poster">
              <img src={`/${book.image}`} alt="poster" />
              <Link href={`/read/[read]`} as={`/read/${book._id}`}>
                <a className="read">Read</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Header>
  );
}

export async function getServerSideProps(context) {
  const path = context.req.path.replace("/monograph", "");

  const book = await (
    await fetch(`http://localhost:3000/books${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  return {
    props: {
      book: JSON.parse(JSON.stringify(book)),
    },
  };
}

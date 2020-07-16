import Header from "../components/Header";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import Book from "../components/Book";

export default function Monographs({ books: { books, success } }) {
  return (
    <Header>
      <div className="container">
        {success && (
          <div className="grid">
            {books.map((item) => (
              <Book key={item._id} data={item} />
            ))}
          </div>
        )}
      </div>
    </Header>
  );
}

export async function getServerSideProps(context) {
  const auth = context.req.headers.cookie
    .split("; ")
    .find((item) => item.includes("akidie-auth"));
  const [, token] = auth.split("=");
  console.log(token);
  const books = await (
    await fetch(`http://localhost:3000/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  return {
    props: {
      books,
    },
  };
}

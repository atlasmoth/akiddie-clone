import Header from "../components/Header";
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
  const books = await (
    await fetch(`${context.req.protocol}://${context.req.get("host")}/books`, {
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

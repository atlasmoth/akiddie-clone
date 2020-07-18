import Header from "../../components/Header";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Read(props) {
  useEffect(() => {
    fetch(`http://localhost:3000/books/5f1202010b64ff1374114ece/read`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("akidie-auth")}`,
      },
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.blob();
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const reader = new FileReader();
        reader.onload = function (stuff) {
          console.log(stuff);
          console.log(reader.result);
        };
        reader.readAsDataURL(data);
      })
      .catch(console.log);
  }, []);
  return (
    <Header>
      <div className="container">
        <h2>I love to read</h2>
      </div>
    </Header>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      beans: "man, i love beans",
    },
  };
}

import Header from "../components/Header";
import { useState } from "react";
import Cookies from "js-cookie";

import { useRouter } from "next/router";

export default function Upload() {
  const router = useRouter();
  const [state, setState] = useState({
    title: "",
    isbn: "",
    price: 0,
    genre: "",
    description: "",
  });
  function setChange({ target: { name, value } }) {
    setState((current) => ({ ...current, [name]: value }));
  }
  async function handleForm(e) {
    e.preventDefault();

    if (Cookies.get("akidie-auth")) {
      const data = new FormData(e.target);

      fetch(`${location.origin}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("akidie-auth")}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((bookData) => {
          setState({
            title: "",
            isbn: "",
            price: 0,
            genre: "",
            description: "",
          });
          router.push(
            "/monograph[monograph]",
            `/monograph/${bookData.book._id}`
          );
        })
        .catch(console.log);
    } else {
      router.push("/signin");
    }
  }
  return (
    <Header>
      <form
        encType="multipart/form-data"
        className="container signin-form"
        onSubmit={handleForm}
      >
        <div className="field">
          <label htmlFor="title">title</label>
          <input
            type="text"
            placeholder="title"
            id="title"
            name="title"
            onChange={setChange}
            value={state.title}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="isbn">isbn</label>
          <input
            type="emial"
            placeholder="isbn"
            id="isbn"
            name="isbn"
            onChange={setChange}
            value={state.isbn}
            required
            onBlur={setChange}
          />
        </div>
        <div className="field">
          <label htmlFor="price">price</label>
          <input
            type="number"
            placeholder="price"
            id="price"
            name="price"
            value={state.price}
            onChange={setChange}
            required
            min="0"
          />
        </div>
        <div className="field">
          <label htmlFor="genre">genre</label>
          <select
            name="genre"
            id="genre"
            onChange={setChange}
            value={state.genre}
            onChange={setChange}
          >
            <optgroup label="Select Genre">
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Development">Development</option>
            </optgroup>
          </select>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={state.description}
            onChange={setChange}
          ></textarea>
        </div>
        <div className="field">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" />
        </div>
        <div className="field">
          <label htmlFor="doc">PDF</label>
          <input type="file" name="doc" id="doc" />
        </div>
        <div className="field">
          <button type="submit">Upload</button>
        </div>
      </form>
    </Header>
  );
}

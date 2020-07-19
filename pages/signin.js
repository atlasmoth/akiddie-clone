import Header from "../components/Header";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import authContext from "./../components/authContext";

export default function signin() {
  const { dispatch } = useContext(authContext);

  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  function setChange({ target: { name, value } }) {
    setState((current) => ({ ...current, [name]: value }));
  }
  async function submitForm(e) {
    e.preventDefault();
    const url = `${location.origin}/users`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state), // body data type must match "Content-Type" header
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        } else {
          throw new Error("Login error");
        }
      })
      .then((data) => {
        dispatch({ type: "login", token: data.token });
        setState({
          email: "",
          password: "",
        });
        router.push(`/monographs`);
      })
      .catch((e) => {
        location.reload();
      });
  }
  return (
    <Header>
      <form className="signin-form container" onSubmit={submitForm}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={setChange}
            value={state.email}
            required
            onBlur={setChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={state.password}
            onChange={setChange}
            required
          />
        </div>

        <div className="field">
          <button type="submit">Log in</button>
        </div>
      </form>
    </Header>
  );
}

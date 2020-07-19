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
    const url = `${location.origin}/users/login`;
    const res = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(state), // body data type must match "Content-Type" header
      })
    ).json();
    if (res.sucess) {
      setState({
        email: "",
        password: "",
      });
      dispatch({ type: "login", token: res.token });
      router.push(`/monographs`);
    } else {
      console.log(res);
    }
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

import Header from "../components/Header";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function signin() {
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
    const url = `http://localhost:3000/users/login`;
    const res = await (
      await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(state), // body data type must match "Content-Type" header
      })
    ).json();
    if (res.sucess) {
      Cookies.set("akidie-auth", res.token);
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
          <button type="submit">Register</button>
        </div>
      </form>
    </Header>
  );
}

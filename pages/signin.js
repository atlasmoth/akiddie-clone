import Header from "../components/Header";
import { useState } from "react";

export default function signin() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  function setChange({ target: { name, value } }) {
    setState((current) => ({ ...current, [name]: value }));
  }
  return (
    <Header>
      <form className="signin-form container">
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

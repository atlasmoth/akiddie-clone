import Header from "../components/Header";
import { useState } from "react";
export default function signup() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  function setChange({ target: { name, value } }) {
    setState((current) => ({ ...current, [name]: value }));
  }
  return (
    <Header>
      <form className="signin-form container">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            onChange={setChange}
            value={state.username}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="emial"
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
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            onChange={setChange}
            value={state.role}
            onChange={setChange}
          >
            <optgroup label="Select role">
              <option value="user">User</option>
              <option value="author">Author</option>
            </optgroup>
          </select>
        </div>
        <div className="field">
          <button type="submit">Register</button>
        </div>
      </form>
    </Header>
  );
}

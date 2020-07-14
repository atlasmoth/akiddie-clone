import Header from "./../components/Header";
import { useState } from "react";
export default function signin() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  function setChange(e) {
    console.log(e);
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
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            onChange={setChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={setChange}
          />
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <select name="role" id="role" onChange={setChange}>
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

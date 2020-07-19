import Header from "../components/Header";
import { useState, useContext } from "react";
import authContext from "./../components/authContext";
import { useRouter } from "next/router";

export default function signup() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const { dispatch } = useContext(authContext);
  const router = useRouter();

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
          username: "",
          email: "",
          password: "",
          role: "",
        });
        router.push(`/monographs`);
      })
      .catch((e) => {
        console.log("This has just run");
        console.log(e);
        // location.reload();
      });
  }
  return (
    <Header>
      <form className="signin-form container" onSubmit={submitForm}>
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

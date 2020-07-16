import "../styles.css";
import { useReducer, useEffect } from "react";
import authContext from "./../components/authContext";
import Cookies from "js-cookie";

function reducer(state, action) {
  switch (action.type) {
    case "auth": {
      return { ...state, auth: action.auth };
    }
    case "login": {
      console.log("This has been called");
      Cookies.set("akidie-auth", action.token);
      return { ...state, auth: true };
    }
    default: {
      return { ...state };
    }
  }
}

export default function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, { auth: false });

  useEffect(() => {
    if (Cookies.get("akidie-auth")) {
      fetch(`http://localhost:3000/users/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("akidie-auth")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "auth", auth: data.auth });
        })
        .catch(console.log);
    }
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      <Component {...pageProps} />
    </authContext.Provider>
  );
}

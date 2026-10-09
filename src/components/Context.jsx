import { createAsync, useLocation } from "@solidjs/router";
import { createContext, useContext } from "solid-js";
import { logout, querySession } from "../auth";

const Context = createContext();

export default function Auth(props) {
  const location = useLocation();
  const session = createAsync(() => querySession(location.pathname), {
    deferStream: true,
  });
  const signedIn = () => Boolean(session()?.id);

  return (
    <Context.Provider value={{ session, signedIn, logout }}>
      {props.children}
    </Context.Provider>
  );
}

export function useAuth() {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth must be used within Auth context");
  return context;
}

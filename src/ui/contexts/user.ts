import { createContext, useContext } from "react";

const userContext = createContext({ name: null });

export function useUser() {
  return useContext(userContext);
}

export default userContext;

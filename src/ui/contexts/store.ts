import { createContext, useContext } from "react";

export const storeContext = createContext({
  accounts: [],
  budget: [],
  goals: {
    debt: [],
    savings: [],
  },
  retirement: [],
  score: {
    value: null,
    peer: null,
    entries: [],
  },
  transactions: [],
});

export function useStore() {
  return useContext(storeContext);
}

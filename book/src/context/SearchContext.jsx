import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  name: localStorage.getItem("searchName") || "",
  date: new Date(localStorage.getItem("searchDate") || new Date()),
  options: JSON.parse(localStorage.getItem("searchOptions") || "{}"),
};

export const SearchContext = createContext(INITIAL_STATE);

const searchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  // Efekat za čuvanje promjena stanja
  useEffect(() => {
    localStorage.setItem("searchName", state.name);
    localStorage.setItem("searchDate", state.date.toISOString());  // čuvanje datuma kao string
    localStorage.setItem("searchOptions", JSON.stringify(state.options));  // čuvanje objekta kao string
  }, [state]);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

import React, { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = (() => {
  const savedState = JSON.parse(localStorage.getItem("search"), (key, value) => {
    if (key === 'startDate' || key === 'endDate') {
      return new Date(value);
    }
    return value;
  });

  return {
    city: undefined,
    dates: [],
    options: {
      adult: undefined,
      children: undefined,
      room: undefined,
    },
    ...savedState,
  };
})();

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
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
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify({
      city: state.city,
      dates: state.dates,
      options: state.options,
    }));
  }, [state.city, state.dates, state.options]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
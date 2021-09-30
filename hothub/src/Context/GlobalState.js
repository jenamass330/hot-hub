import React, { createContext, useEffect, useReducer, useReffect } from "react";
import AppReducer from "./AppReducer";

//initial state

let watchingList = window.localStorage.getItem("watchList");
let watchedList = window.localStorage.getItem("watched");

const initialState = {
  watchList: watchingList ? JSON.parse(watchingList) : [],
  watched: watchedList ? JSON.parse(watchedList) : [],
};

//create context

export const GlobalContext = createContext(initialState);

//provider

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    window.localStorage.setItem("watchList", JSON.stringify(state.watchList));
    window.localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  const addMovieToWatchList = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        watched: state.watched,
        addMovieToWatchList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

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

  const removeMovieFromWatchList = (id) => {
    dispatch({type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id})
  }

  const addMovieToWatched = (movie) => {
    dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie})
  }

  const moveToWatchList = (movie) => {
    dispatch({type: "MOVE_TO_WATCHLIST", payload: movie})
  }

  const removeFromWatched = (id) => {
    dispatch({type: "REMOVE_FROM_WATCHED", payload: id})
  }

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        watched: state.watched,
        addMovieToWatchList,
        removeMovieFromWatchList,
        addMovieToWatched,
        moveToWatchList,
        removeFromWatched
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

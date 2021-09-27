import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//IMPORTED COMPONENTS
import ActorDetails from "./Components/ActorDetails";
import DirectorDetails from "./Components/DirectorDetails";
import Footer from "./Components/Footer"
import GlobalStyles from "./Components/GlobalStyles"
import Header from "./Components/Header"
import Login from "./Components/Login"
import MovieDetails from "./Components/MovieDetails"
import Profile from "./Components/Profile"


function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/profile/:profileId">
            <Profile />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Route path="/director/directorId">
            <DirectorDetails />
          </Route>
          <Route path="/actor/actorId">
            <ActorDetails />
          </Route>
        </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

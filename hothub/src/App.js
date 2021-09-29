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
import Contact from "./Components/Contact"
import About from "./Components/About"
import Home from "./Components/Home";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Body>
        <Switch>
          <Route exact path="/">
          <Home />
          </Route>
          <Route path="/profile">
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
          <Route path="/About">
            <About />
          </Route>
          <Route exact path="/Contact">
            <Contact />
          </Route>
        </Switch>
        </Body>
      <Footer />
    </BrowserRouter>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff8dc;
`

export default App;

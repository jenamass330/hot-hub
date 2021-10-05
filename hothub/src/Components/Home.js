import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Popcorn from "../assets/popcorncrop.jpg";
import styled from "styled-components";
import Login from "./Login";
import { IoPersonCircleSharp } from "react-icons/io5";
import ResultCard from "./ResultCard";
import DiscoverMini from "./DiscoverMini";

import WatchListMini from "./WatchListMini";
import NewsFeed from "./NewsFeed";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState({});




  // look into debouncing in React

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  useEffect(() => {

    if (isAuthenticated) {
      fetch("/user/" + user.email)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data)
          // console.log(data.data.watchList)
        })
        .catch((err) => {
          console.log("error", err);
        })
      }

  }, [isAuthenticated, userData]);


  if (isAuthenticated) {
    // const databaseUser = getUser(user.email)
    // if (!databaseUser) {
      // let newUser = {
        // email: user.email,
        // watchlist: [],
        // watched: [],
        // 
      //}
      // postUser({email: user.email})
    //}
  }

  if (isLoading) {
    return <div></div>;
  }
  return isAuthenticated ? (
    <>
      <Wrap>
        <div></div>
        <Banners style={{ backgroundColor: "#ffc40c" }}>
          <img
            src={Popcorn}
            style={{
              height: "370px",
              padding: "0",
              position: "static",
              border: "0",
              minWidth: "970px",
              zIndex: "0",
              backgroundColor: "#f4ca16",
            }}
          />
          <Overlap></Overlap>
          <Box>
            “The whole of life is just like watching a film. Only it's as though
            you always get in ten minutes after the big picture has started, and
            no-one will tell you the plot, so you have to work it out all
            yourself from the clues.” ― Terry Pratchett
            <Box2>
              What kind of lunatic would ever start a movie ten minutes in? Whatever you choose to do with your time, don't forget the popcorn.
            </Box2>
          </Box>
        </Banners>
      </Wrap>
      <InputWrapper>
      <WatchListMini userData={userData}/>
      <DiscoverMini />
      <NewsFeed />
      <InputResult>
        <Input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={onChange}
        />
        {results.length > 0 && (
          <List>
            {results.map((movie) => (
              <li key={movie.id}>
              <ResultCard movie={movie} userData={userData} setUserData={setUserData}/>
              </li>
            ))}
          </List>
        )}
        </InputResult>
      </InputWrapper>
    </>
  ) : (
    <>
      <Wrap>
        <Banners style={{ backgroundColor: "#ffc40c" }}>
          <img
            src={Popcorn}
            style={{
              height: "370px",
              padding: "0",
              position: "static",
              border: "0",
              minWidth: "970px",
              zIndex: "0",
              backgroundColor: "#f4ca16",
            }}
          />
          <Square></Square>
          <LoginBox style={{ fontStyle: "normal", fontWeight: "bold" }}>
            Discover & watch more
            <div style={{ marginTop: "5px", marginRight: "10px" }}>
              <IoPersonCircleSharp />
            </div>
            <Login />
          </LoginBox>
          <DiscoverMini />
        </Banners>
      </Wrap>
    </>
  );
};

const InputResult = styled.div`
  position: absolute;
  right: 0px;
`

const Wrap = styled.div`
  background-color: #fff8dc;
  width: 100%;
`;

const Square = styled.div``;

const Banners = styled.div`
  display: flex;
`;

const Overlap = styled.div`
  height: 300px;
  width: 40%;
  position: absolute;
  overflow: hidden;
  display: block;
  margin: auto;
`;
const Box = styled.div`
  //   background-color: red;
  height: 300px;
  width: 30%;
  position: absolute;
  margin-top: 120px;
  right: 0px;
  margin-right: 200px;
  font-size: 15px;
  font-style: italic;
  display: block;
  @media only screen and (max-width: 1000px) {
    display: none;
    transition: visibility 0s, opacity 0.5s linear;
  }
`;
const LoginBox = styled.div`
  height: 300px;
  width: 20%;
  border: 1px solid #f68888;
  position: absolute;
  margin-top: 150px;
  right: 0px;
  margin-right: 200px;
  font-size: 20px;
  font-style: italic;
  display: block;
  background-color: #fff8dc;
`;
const Box2 = styled.div`
  margin-top: 30px;
  font-weight: bold;
  font-style: normal;
`;
const InputWrapper = styled.div`
  // border: 1px solid red;
  display: flex;
`;

const Input = styled.input`
  border: 1px solid darkred;
  background-color: #EAE6D7;
  
`
const List = styled.ul`
margin-top: 10px;
margin-left: 45px;
`

// const NewsFeed = styled.div`
//   text-align: center;
//   display: block;
//   width: 30%;
//   border: 1px solid purple;
//   position: relative;
  
// `
const Result = styled.div``

export default Home;

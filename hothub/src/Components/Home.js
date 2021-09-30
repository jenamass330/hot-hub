import React, { useState } from "react";
import { ReactDOM } from "react-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Banner from "../assets/image.jpg";
import Popcorn from "../assets/popcorncrop.jpg";
import styled from "styled-components";
import Login from "./Login";
import { IoPersonCircleSharp } from "react-icons/io5";
import ResultCard from "./ResultCard";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
        console.log(data);
      });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
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
              So make sure you don't start watching a movie ten minutes in. And,
              of course, don't forget the popcorn.
            </Box2>
          </Box>
        </Banners>
        <div>NewsFeed</div>
      </Wrap>
      <InputWrapper>
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={onChange}
        />
      </InputWrapper>
      {results.length > 0 && (
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>
              <ResultCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
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
        </Banners>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background-color: #fff8dc;
  width: 100%;
`;

const Square = styled.div``;

const Banners = styled.div`
  display: flex;
`;
const Gif = styled.iframe`
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  right: 0px;
  margin-top: 270px;
  margin-right: -180px;
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
const InputWrapper = styled.div``;
export default Home;

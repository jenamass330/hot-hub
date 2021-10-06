import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const MovieControls = ({ movie, type }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/user/" + user.email)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [isAuthenticated]);

  const addMovieToWatched = (movie) => {
    let watchedArray = [...userData.watchedList];
    watchedArray.push(movie);
    let postedObject = {
      method: "POST",
      body: JSON.stringify({ email: user.email, watchedList: watchedArray }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/watchedlist", postedObject)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        return data;
      });
  };

  const removeMovieFromWatchList = () => {
    // let watchArray = [...userData.watchlist]
    // watchArray.forEach((movie) => {
    //   if(movie.id === movie.id) {
    //     watchArray.filter((mov) => mov.id !== movie.id)
    //   }
    // })
    // // userData.watchlist.filter((mov)=> mov.id !== movie.id)
    // let postedObject = {
    //   method: "POST",
    //   body: JSON.stringify({ email: user.email, watchlist: watchArray }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch("/watchlist", postedObject)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUserData(data);
    //     return data;
    //   });
  };


  const moveToWatchList = () => {};

  const removeFromWatched = () => {};

  return (
    <InnerCard>
      {type === "watchList" && (
        <>
          <Wrapper>
            <Button
              style={{ border: "none" }}
              onClick={() => addMovieToWatched(movie)}
            >
              <AiOutlineCheck />
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => removeMovieFromWatchList(movie)}
            >
              <AiOutlineClose />
            </Button>
          </Wrapper>
        </>
      )}
      {type === "watched" && (
        <>
          <Wrapper>
            <Button
              style={{ border: "none" }}
              onClick={() => moveToWatchList(movie)}
            >
              <AiOutlineEye />
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => removeFromWatched(movie.id)}
            >
              <AiOutlineClose />
            </Button>
          </Wrapper>
        </>
      )}
    </InnerCard>
  );
};

const InnerCard = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  background-color: transparent;
  border-radius: 50%;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    background-color: #eae6d7;
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

export default MovieControls;

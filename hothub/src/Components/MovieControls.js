import React from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const MovieControls = ({ movie, type, userData, setUserData }) => {
  const { user } = useAuth0();

  const addMovieToWatched = (movie) => {
    let watchedArray = [...userData.watchedList];
    watchedArray.push(movie);
    let postedObject = {
      method: "PUT",
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
      });
  };

  const removeMovieFromWatchList = (movie) => {
    let watchArray = [...userData.watchlist];
    watchArray = watchArray.filter((mov) => {
      return mov.id !== movie.id;
    });
    let postObject = {
      method: "PUT",
      body: JSON.stringify({ email: user.email, watchlist: watchArray }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/watchlist", postObject)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        window.location.reload()
      });
  };

  const moveToWatchList = (movie) => {
    let watchArray = [...userData.watchlist];
    watchArray.push(movie);
    let postedObject = {
      method: "PUT",
      body: JSON.stringify({ email: user.email, watchlist: watchArray }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/watchlist", postedObject)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });

  };

  const removeFromWatched = (movie) => {
    let watchedArray = [...userData.watchedList];
    watchedArray = watchedArray.filter((mov) => {
      return mov.id !== movie.id;
    });
    let postedObject = {
      method: "PUT",
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
        window.location.reload()
      });
  };

  return (
    <InnerCard>
      {type === "watchList" && (
        <>
          <Wrapper>
            <Button
              style={{ border: "none" }}
              onClick={() => {
                addMovieToWatched(movie);
                removeMovieFromWatchList(movie);
              }}
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
              onClick={() => {
                moveToWatchList(movie);
                removeFromWatched(movie);
              }}
            >
              <AiOutlineEye />
            </Button>
            <Button
              style={{ border: "none" }}
              onClick={() => removeFromWatched(movie)}
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

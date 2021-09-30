import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const MovieControls = ({ movie, type }) => {
  const {
    removeMovieFromWatchList,
    addMovieToWatched,
    moveToWatchList,
    removeFromWatched,
  } = useContext(GlobalContext);
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
              onClick={() => removeMovieFromWatchList(movie.id)}
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
    background-color: lightgrey;
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

export default MovieControls;

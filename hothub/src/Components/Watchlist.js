import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const { watchList } = useContext(GlobalContext);
  console.log(watchList);

  return (
    <>
      <Wrapper>
        {watchList.length > 0 ? (
          <Grid>
            {watchList.map((movie) => (
              <MovieCard movie={movie} type="watchList" />
            ))}
          </Grid>
        ) : (
          <div>Add movies to your watchlist!</div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;
const Grid = styled.div``;

export default Watchlist;

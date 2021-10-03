import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const WatchListMini = () => {
  const { watchList } = useContext(GlobalContext);
  console.log(watchList);
  let history = useHistory();

  return (
    <>
      <WholeWrap>
        <Boxed>
          <Title>Watchlist:</Title>
          <ViewLength>
            <div>{watchList.length} movies</div>
            <ViewMore
              style={{ textDecoration: "underline", color: "darkred" }}
              onClick={() => history.push("/watchlist")}
            >
              View More
            </ViewMore>
          </ViewLength>
          <Wrapper>
            {watchList.length > 0 ? (
              <Grid>
                {watchList.slice(0, 6).map((movie) => (
                  <MovieCard
                    title={movie.title}
                    movie={movie}
                    type="watchList"
                  />
                ))}
              </Grid>
            ) : (
              <div>Add movies to your watchlist!</div>
            )}
          </Wrapper>
        </Boxed>
      </WholeWrap>
    </>
  );
};

const WholeWrap = styled.div`
  padding-left: 100px;
  position: relative;
`;

const Title = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 15px;
  margin-right: 50px;
`;
const ViewLength = styled.div`
  float: right;
  margin-bottom: 15px;
  padding-right: 50px;
`;

const Boxed = styled.div`
  width: 300px;
  margin-top: 50px;
`;

const Wrapper = styled.div``;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 250px;
  height: 300px;
  //   border: 1px solid red;
  justify-content: space-between;
  padding: 10px;
`;
const ViewMore = styled.div`
  display: inline-block;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export default WatchListMini;

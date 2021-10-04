import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styled from "styled-components";

import DiscoverCard from "./DiscoverCard";

const Discover = () => {
  const [popular, setPopular] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const popularMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        );
        const popularTitles = await res.json();
        setPopular(popularTitles.results);
      } catch (err) {
        console.log(err, "error");
      }
    };
    popularMovies();
  }, []);

  return (
    <>
      <WholeWrap>
        <Boxed>
          <Title>Discover:</Title>
          <ViewLength>
            <div>{popular.length} movies</div>
            <ViewMore
              style={{ textDecoration: "underline", color: "darkred" }}
              onClick={() => history.push("/discover")}
            >
              View More
            </ViewMore>
          </ViewLength>
          <Wrapper>
            {popular.length > 0 ? (
              <Grid>
                {popular.slice(0, 6).map((movie) => (
                  <DiscoverCard movie={movie} type="watched" />
                ))}
              </Grid>
            ) : (
              <div>Add movies to watched!</div>
            )}
          </Wrapper>
        </Boxed>
      </WholeWrap>
    </>
  );
};

const WholeWrap = styled.div`
  padding-left: 100px;
  position: absolute;
  margin-top: 400px;
  z-index: 1;
`;
const Boxed = styled.div`
  width: 300px;
  margin-top: 50px;
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

export default Discover;

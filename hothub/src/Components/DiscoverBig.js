import React, { useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import BigDiscoverCard from "./BigDiscoverCard";
import styled from "styled-components";
import DiscoverCard from "./DiscoverCard";

const DiscoverBig = () => {
  const [popular, setPopular] = useState([]);

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
      <BigWrap>
        <div>Discover:</div>
        <div>{popular.length} movies</div>
        <Wrapper>
          {popular.length > 0 ? (
            <>
              <Grid>
                {popular.map((movie) => (
                  <>
                    <Card>
                      <BigDiscoverCard
                        title={movie.title}
                        movie={movie}
                        type="watched"
                      />
                    </Card>
                  </>
                ))}
              </Grid>
            </>
          ) : (
            <div>Add movies to watched!</div>
          )}
        </Wrapper>
      </BigWrap>
    </>
  );
};

const BigWrap = styled.div`
  padding-left: 200px;
  padding-right: 200px;

`;

const Wrapper = styled.div``;
const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Div = styled.div`
  /* display: none; */
  background-color: white;
`;
const Card = styled.div`
  &:hover + Div {
    display: block;
  }
`;

export default DiscoverBig;

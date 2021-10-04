import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import DiscoverControls from "./DiscoverControls";
import RecommendationCard from "./RecommendationCard";

const Recommendation = () => {
  const { movieId } = useParams();

  const [similar, setSimilar] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const getSimMovies = async () => {
      try {
        const result = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        );
        const simMovies = await result.json();
        setSimilar(simMovies.results);
      } catch (err) {
        console.log(err, "nope this ain't workin'");
      }
    };
    getSimMovies();
  }, [movieId]);

  const allSims = (
    <Grid>
      {similar.slice(10, 20).map((movie) => (
        <>
          <Card>
            <RecommendationCard
              title={movie.title}
              movie={movie}
              type="watched"
            />
          </Card>
        </>
      ))}
    </Grid>
  );

  return (
    <>
      <BigWrap>
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Browse Similar Tites:
        </div>
        <Wrapper>
          {similar.length > 0 ? (
            <>
              <Grid>
                {similar.slice(0, 10).map((movie) => (
                  <>
                    <Card>
                      <RecommendationCard
                        title={movie.title}
                        movie={movie}
                        type="watched"
                      />
                    </Card>
                  </>
                ))}
              </Grid>
            </>
          ) : null}

          {hidden === false ? (
            <>
              <ViewMore
                onClick={() => {
                  setReadMore(!readMore);
                  setHidden(true);
                }}
              >
                View more similar titles
              </ViewMore>
              {readMore && allSims}
            </>
          ) : (
            <>
              <div>{allSims}</div>
            </>
          )}
        </Wrapper>
      </BigWrap>
    </>
  );
};

const ViewMore = styled.div`
  letter-spacing: 3px;
  margin-bottom: 40px;
  margin-top: 20px;
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

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

const Card = styled.div`
  &:hover + Div {
    display: block;
  }
`;

export default Recommendation;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";

const DirectorDetails = () => {
  const { productionId } = useParams();
  const [production, setProduction] = useState([]);
  const [castInfo, setCastInfo] = useState([]);
  const [productionInfo, setProductionInfo] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hide, setHide] = useState(false);

  let n = production.length - 10;

  const allMovies = (
    <CreditWrapper>
      <Grid>
        {production.slice(10, n).map((act) => (
          <>
            <Wrap>
              <Link to={`/movies/${act.id}`}>
                <Poster
                  src={`https://image.tmdb.org/t/p/w200${act.poster_path}`}
                />
              </Link>
              <div
                style={{ fontSize: "15px", width: "90px", textAlign: "center" }}
              >
                <Bold>{act.title}</Bold> as {act.job}
              </div>
            </Wrap>
          </>
        ))}
      </Grid>
    </CreditWrapper>
  );

  const allActMovies = (
    <CreditWrapper>
      <Grid>
        {castInfo.slice(10, n).map((crewDetails) => (
          <>
            <Wrap>
              <Link to={`/movies/${crewDetails.id}`}>
                <Poster
                  src={`https://image.tmdb.org/t/p/w200${crewDetails.poster_path}`}
                />
              </Link>
              <div
                style={{
                  fontSize: "15px",
                  width: "90px",
                  textAlign: "center",
                }}
              >
                {crewDetails.title} as {crewDetails.character}
              </div>
            </Wrap>
          </>
        ))}
      </Grid>
    </CreditWrapper>
  );

  useEffect(() => {
    const findProduction = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${productionId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const productionDetails = await res.json();
        setProduction(productionDetails.crew);
        setCastInfo(productionDetails.cast);
      } catch (err) {
        console.log(err, "there ain't no actors here");
      }
    };
    const findProductionInfo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${productionId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const productionInfoDetails = await res.json();
        setProductionInfo(productionInfoDetails);
      } catch (err) {
        console.log(err, "there ain't no actors here");
      }
    };
    findProduction();
    findProductionInfo();
  }, []);

  return (
    <>
      {productionInfo.profile_path === null ? (
        <DetailWrapper>
          <Details>
            <Name>{productionInfo.name}</Name>
            <div> &nbsp; known for {productionInfo.known_for_department}</div>
            <Birth>{productionInfo.birthday}</Birth>
            <Death>{productionInfo.deathday}</Death>
            <Birthplace>{productionInfo.place_of_birth}</Birthplace>
            <Bio>{productionInfo.biography}</Bio>
          </Details>
        </DetailWrapper>
      ) : productionInfo.deathday === null ? (
        <DetailWrapper>
          <Photo
            src={`https://image.tmdb.org/t/p/w200${productionInfo.profile_path}`}
          ></Photo>
          <Details>
            <Name>{productionInfo.name}</Name>
            <Birth>{productionInfo.birthday}</Birth>
            <Birthplace>{productionInfo.place_of_birth}</Birthplace>
            <Bio>{productionInfo.biography}</Bio>
          </Details>
        </DetailWrapper>
      ) : (
        <DetailWrapper>
          <Photo
            src={`https://image.tmdb.org/t/p/w200${productionInfo.profile_path}`}
          ></Photo>
          <Details>
            <Name>{productionInfo.name}</Name>
            <Birth>{productionInfo.birthday}</Birth>
            <Death>{productionInfo.deathday}</Death>
            <Birthplace>{productionInfo.place_of_birth}</Birthplace>
            <Bio>{productionInfo.biography}</Bio>
          </Details>
        </DetailWrapper>
      )}

      <CreditWrapper>
        <PlayedIn>
          Movies {productionInfo.name} was a crew member for:{" "}
        </PlayedIn>
        <Grid>
          {production.slice(0, 10).map((act) => (
            <>
              <Wrap>
                <Link to={`/movies/${act.id}`}>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w200${act.poster_path}`}
                  />
                </Link>
                <div
                  style={{
                    fontSize: "15px",
                    width: "90px",
                    textAlign: "center",
                  }}
                >
                  {act.title} as {act.job}
                </div>
              </Wrap>
            </>
          ))}
        </Grid>
        {hidden === false ? (
          <>
            <ViewMore
              onClick={() => {
                setReadMore(!readMore);
                setHidden(true);
              }}
            >
              View more titles
            </ViewMore>
            {readMore}
          </>
        ) : (
          <>
            <ViewMore
              onClick={() => {
                setHidden(false);
                setReadMore(readMore);
              }}
            >
              View less titles
            </ViewMore>
            {allMovies}
          </>
        )}
      </CreditWrapper>
      <CreditWrapper>
        <PlayedIn>Movies {productionInfo.name} has played in: </PlayedIn>
        <Grid>
          {castInfo.slice(0, 10).map((crewDetails) => (
            <>
              <Wrap>
                <Link to={`/movies/${crewDetails.id}`}>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w200${crewDetails.poster_path}`}
                  />
                </Link>
                <div
                  style={{
                    fontSize: "15px",
                    width: "90px",
                    textAlign: "center",
                  }}
                >
                  {crewDetails.title} as {crewDetails.character}
                </div>
              </Wrap>
            </>
          ))}
        </Grid>
        {hide === false ? (
          <>
            <ViewMore
              onClick={() => {
                setReadMore(!readMore);
                setHide(true);
              }}
            >
              View more titles
            </ViewMore>
            {readMore}
          </>
        ) : (
          <>
            <ViewMore
              onClick={() => {
                setHide(false);
                setReadMore(readMore);
              }}
            >
              View less titles
            </ViewMore>
            {allActMovies}
          </>
        )}
      </CreditWrapper>
    </>
  );
};

const CreditWrapper = styled.div``;

const DetailWrapper = styled.div`
  display: flex;
  border: 1px solid darkred;
  min-width: 900px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-bottom: 50px;
  margin-top: 40px;
  padding: 20px;
  background-color: #eae6d7;
  box-shadow: 1px 1px 10px 1px darkred;
`;

const Photo = styled.img`
  min-width: 300px;
`;

const Details = styled.div``;

const Name = styled.div`
  font-size: 25px;
  letter-spacing: 3px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Birth = styled.div``;

const Birthplace = styled.div``;

const Death = styled.div``;

const Bio = styled.div`
  margin-top: 10%;
  transform: translateY(-10%);
  margin-left: 10px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const Wrap = styled.div``;

const Poster = styled.img`
  height: 150px;
  margin-right: 20px;
`;

const ViewMore = styled.div`
  letter-spacing: 3px;
  margin-bottom: 60px;
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

const Bold = styled.div`
  font-weight: bold;
`;
const PlayedIn = styled.div`
  font-size: 25px;
  margin-left: 50%;
  transform: translateX(-50%);
  text-align: center;
  letter-spacing: 3px;
  margin-bottom: 50px;
  border-bottom: 1px solid grey;
  box-shadow: 0 4px 4px -3px darkred;
  display: inline-block;
`;

export default DirectorDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ActorDetails = ({ movie, type }) => {
  const { actorId } = useParams();
  const [actor, setActor] = useState([]);
  const [crew, setCrew] = useState([]);
  const [actorInfo, setActorInfo] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [hidden, setHidden] = useState(false);

  let n = actor.length - 10;

  const allMovies = (
    <CreditWrapper>
      <Grid>
        {actor.slice(10, n).map((act) => (
          <>
            <Wrap>
              <StyledLink to={`/movies/${act.id}`}>
                <Poster
                  src={`https://image.tmdb.org/t/p/w200${act.poster_path}`}
                />
              </StyledLink>
              <div
                style={{ fontSize: "15px", width: "90px", textAlign: "center" }}
              >
                <Bold>{act.title}</Bold> as {act.character}
              </div>
            </Wrap>
          </>
        ))}
      </Grid>
    </CreditWrapper>
  );

  useEffect(() => {
    const findActor = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const actorDetails = await res.json();
        setActor(actorDetails.cast);
        setCrew(actorDetails.crew);
      } catch (err) {
        console.log(err, "there ain't no actors here");
      }
    };
    const findActorInfo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const actorInfoDetails = await res.json();
        setActorInfo(actorInfoDetails);
      } catch (err) {
        console.log(err, "there ain't no actors here");
      }
    };
    findActor();
    findActorInfo();
  }, []);

  return (
    <>
      {actorInfo.deathday === null ? (
        <DetailWrapper>
          <Photo
            src={`https://image.tmdb.org/t/p/w200${actorInfo.profile_path}`}
          ></Photo>
          <Details>
            <Name>{actorInfo.name}</Name>
            <Birth>{actorInfo.birthday}</Birth>
            <Birthplace>{actorInfo.place_of_birth}</Birthplace>
            <Bio>{actorInfo.biography}</Bio>
          </Details>
        </DetailWrapper>
      ) : (
        <DetailWrapper>
          <Photo
            src={`https://image.tmdb.org/t/p/w200${actorInfo.profile_path}`}
          ></Photo>
          <Details>
            <Name>{actorInfo.name}</Name>
            <Birth>{actorInfo.birthday}</Birth>
            <Death>{actorInfo.deathday}</Death>
            <Birthplace>{actorInfo.place_of_birth}</Birthplace>
            <Bio>{actorInfo.biography}</Bio>
          </Details>
        </DetailWrapper>
      )}

      <CreditWrapper>
        <PlayedIn>Movies {actorInfo.name} has played in: </PlayedIn>
        <Grid>
          {actor.slice(0, 10).map((act) => (
            <>
              <Wrap>
                <StyledLink to={`/movies/${act.id}`}>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w200${act.poster_path}`}
                  />
                </StyledLink>
                <div
                  style={{
                    fontSize: "15px",
                    width: "90px",
                    textAlign: "center",
                  }}
                >
                  <Bold>{act.title}</Bold> as {act.character}
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
            {readMore && allMovies}
          </>
        ) : (
          <>
            <div>{allMovies}</div>
          </>
        )}
      </CreditWrapper>

      <CreditWrapper>
        <PlayedIn>Movies {actorInfo.name} was a crew member for: </PlayedIn>
        <Grid>
          {crew.map((crewDetails) => (
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
                  {crewDetails.title} as {crewDetails.job}
                </div>
              </Wrap>
            </>
          ))}
        </Grid>
      </CreditWrapper>
    </>
  );
};

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
  font-size: 17px;
`;

const CreditWrapper = styled.div``;

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

const Poster = styled.img`
  height: 150px;
  margin-right: 20px;
`;
const StyledLink = styled(Link)``;
const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 50%;
  transform: translateX(-50%);
`;
const Wrap = styled.div``;

export default ActorDetails;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";

const Credits = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const result = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const creditDetails = await result.json();
        console.log(creditDetails);
        setCast(creditDetails.cast);
        setCrew(creditDetails.crew);
      } catch (err) {
        console.log(err, "nope this ain't workin'");
      }
    };
    getCredits();
  }, []);

  const castCrew = (
    <SmallWrap>
      <Cast>
        {cast.map((actor) => (
          
            <div style={{ marginBottom: "5px" }}>
            <StyledLink to={`/actor/${actor.id}`}>{actor.name}</StyledLink> as "{actor.character}"
            </div>
          
        ))}
      </Cast>
      <Crew>
        {crew.map((prod) => (
          
          <div style={{ marginBottom: "5px" }}>
            {prod.known_for_department} : <StyledLink to={`/production/${prod.id}`}>{prod.name}</StyledLink>
          </div>
          
        ))}
      </Crew>
    </SmallWrap>
  );

  return (
    <>
      <Wrapper>
        <ViewMore
          onClick={() => {
            setReadMore(!readMore);
          }}
        >
          View Cast and Crew
        </ViewMore>
        {readMore && castCrew}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  width: 800px;
`;

const StyledLink = styled(Link)`
  color: darkred;
`

const ViewMore = styled.button`
  background-color: transparent;
  border: none;
  letter-spacing: 3px;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 25px;
  border-bottom: 1px solid grey;
  box-shadow: 0 4px 4px -3px darkred;

  &:hover {
    cursor: pointer;
  }
  &:active {
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
  }
`;

const SmallWrap = styled.div`
  display: flex;
  margin-top: 35px;
  justify-content: space-between;
`;
const Cast = styled.div`
  margin-left: 60px;
  font-size: 20px;
  margin-right: 50px;
`;
const Crew = styled.div`
  font-size: 20px;
`;



export default Credits;

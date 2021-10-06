import React, { useState, useEffect } from "react";
import BigMovieCard from "./BigMovieCard";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Watched = () => {
  const { user } = useAuth0();
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    fetch("/user/" + user.email)
      .then((res) => res.json())
      .then((data) => {
        setWatched(data.data.watchedList);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // const {watched} = useContext(GlobalContext)
  return (
    <>
      <BigWrap>
        <div>Watched:</div>
        <div>{watched.length} movies</div>
        <Wrapper>
          {watched.length > 0 ? (
            <>
              <Grid>
                {watched.map((movie) => (
                  <>
                    <Card>
                      <BigMovieCard movie={movie} type="watched" />
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

export default Watched;

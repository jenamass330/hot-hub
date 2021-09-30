import React, {useContext} from "react"
import { GlobalContext } from "../Context/GlobalState"
import MovieCard from "./MovieCard"
import styled from "styled-components"


const Watched = () => {
    const {watched} = useContext(GlobalContext)
    return (
        <>
        <div>Watched:</div>
      <Wrapper>
        {watched.length > 0 ? (
          <Grid>
            {watched.map((movie) => (
              <MovieCard movie={movie} type="watched" />
            ))}
          </Grid>
        ) : (
          <div>Add movies to watched!</div>
        )}
      </Wrapper>
    </>
    )
}

const Wrapper = styled.div``;
const Grid = styled.div``;

export default Watched;
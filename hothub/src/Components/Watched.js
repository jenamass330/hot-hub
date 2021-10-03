import React, {useContext} from "react"
import { GlobalContext } from "../Context/GlobalState"
import BigMovieCard from "./BigMovieCard"
import styled from "styled-components"


const Watched = () => {
    const {watched} = useContext(GlobalContext)
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
    )
}

const BigWrap = styled.div`
  padding-left: 200px;
  padding-right: 200px;
`

const Wrapper = styled.div`
  
`;
const Grid = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Div = styled.div`
  /* display: none; */
  background-color: white;
`
const Card = styled.div`
&:hover + Div {
  display: block;
}
`

export default Watched;
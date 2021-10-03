import React from "react"
import styled from "styled-components"
import DiscoverControls from "./DiscoverControls";

const BigMovieCard = ({movie, type}) => {

    return (
        <>
          <Card>
            <Overlay>
              {movie.poster_path ? (
                <>
                <Poster
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
                </>
                
              ) : (
                <div></div>
              )}
            </Overlay>
            <DiscoverControls type={type} movie={movie} />
            <Div>{movie.title}</Div>
            <div style={{textAlign:"center"}}>{movie.release_date ? movie.release_date.substring(0, 4) : null}</div>
          </Card>
        </>
      );
}

const Overlay = styled.div`
  
`;
const Card = styled.div`
  
`;
const Poster = styled.img`
  height: 250px;
`
const Div = styled.div`
  text-align: center;
  font-weight: bold;
  width: 170px;
`


export default BigMovieCard;
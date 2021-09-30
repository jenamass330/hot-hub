import React, {useContext} from "react"
import { GlobalContext } from "../Context/GlobalState"
import styled from "styled-components"

const MovieControls = ({movie, type}) => {
    const {removeMovieFromWatchList, addMovieToWatched, moveToWatchList, removeFromWatched} = useContext(GlobalContext)
    return (
        <InnerCard>
            {type === 'watchList' && (
                <>
                <button onClick={() => addMovieToWatched(movie)}>Add to watched</button>
                <button onClick={() => removeMovieFromWatchList(movie.id)}>Remove from watchlist</button>
                </>
            )}
            {type === 'watched' && 
        (
            <>
            <button onClick={()=> moveToWatchList(movie)}>Add to watchlist</button>
            <button onClick={()=> removeFromWatched(movie.id)}>Remove from watched</button>
            </>
        )}
        </InnerCard>
    )
}

const InnerCard = styled.div``

export default MovieControls

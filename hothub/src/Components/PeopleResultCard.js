import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PeopleResultCard = ({person}) => {
    return(
        <Wrapper>
        <Link to={`/person/${person.id}`} >
        <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt="image of person" />
        </Link>
        <div>
        <Name>{person.name}</Name>
        </div>
        
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: block;
    justify-content: center;
`

const Name = styled.div`
text-align: center;
width: 350px;
font-weight: bold;
font-size: 17px;
`

export default PeopleResultCard
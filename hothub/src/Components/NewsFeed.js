import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const movieNews = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${process.env.REACT_APP_NYT_KEY}`
        );
        const articles = await res.json();
        setArticles(articles.results);
      } catch (err) {
        console.log(err, "error");
      }
    };
    movieNews();
  }, []);

  return (
    <>
      <Wrapper>
        <Title>
          <News>News</News>
          <Div>Feed</Div>
        </Title>
        <AllArticles>
        {articles.slice(0, 20).map((article) => (
          <SmallWrap href={article.link.url}>
            <Articles>
            <ImgDate>
              <Image src={article.multimedia.src}></Image>
              <Date>{article.publication_date}</Date>
              </ImgDate>
              <Text>
                <div style={{fontSize:"20px", textAlign:"center", fontWeight:"bold", marginBottom:"25px"}}>{article.headline}</div>
                <div style={{fontWeight:"bold", textAlign:"center", marginBottom:"25px"}}>{article.byline}</div>
                <div style={{textAlign:"center", marginBottom:"20px"}}>{article.summary_short}</div>
                <a href={article.link.url} style={{color:"black", textTransform:"uppercase", marginLeft:"80%"}} >
                  Read More
                </a>
              </Text>
            </Articles>
          </SmallWrap>
        ))}
        </AllArticles>
      </Wrapper>
    </>
  );
};

const Title = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  font-weight: bold;
  display: flex;
  border-bottom: 1px solid grey;
  box-shadow: 0 4px 4px -3px darkred;
`;
const News = styled.div``;

const Div = styled.div`
  color: darkred;
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: 300px;
  flex-wrap: wrap;
  margin-bottom: 150px;
  margin-top: 30px;
  
`;
const Articles = styled.div`
    display: flex;
    margin-bottom: 35px;
    border: 1px solid darkred;
    width: 1000px;
    align-items: center;
    // margin-left: 225px;
    padding: 15px;
    padding-bottom: 0px;
    box-shadow: 1px 1px 10px 1px darkred;
    background-color: #EAE6D7;
    &:hover {
        filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
    }
`;

const Text = styled.div`
    
`

const Image = styled.img`
    // margin-top: 25px;
    display: block;
`;

const ImgDate = styled.div`
    
`

const Date = styled.div`
    right: 0px;
    float: right;
    color: grey;
`

const SmallWrap = styled.a`
    margin-top: 35px;
    align-items: center;
    color: black;
    text-decoration: none;
    &:hover {
        cursor: pointer;
    }
`

const AllArticles = styled.div`
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 30px;
`

export default NewsFeed;

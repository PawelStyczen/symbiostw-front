import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { fetchHighlightedNews } from "../services/NewsArticleService";
import { useNavigate } from "react-router-dom";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledLink,
  StyledCardImg,
  StyledContainer,
} from "./StyledComponents";
import styled from "styled-components";
import StyledCarousel from "./StyledCarousel"; // Add this import

const FullWidthContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  background: ${({ theme }) => theme.colors.background}; // Use theme background
`;

const NewsWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const CardGrid = styled.div`
  display: grid;

  gap: 2rem;
`;
const NewsContentPreview = styled.div`
  max-height: 5.5em;
  overflow: hidden;
  position: relative;
  margin-bottom: 1em;

  h1,
  h2,
  h3 {
    font-size: 1em;
    font-weight: normal;
    margin: 0 0 0.5em 0;
    display: inline;
  }
`;
const HighlightedNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHighlightedNews = async () => {
      try {
        const data = await fetchHighlightedNews();
        setNews(data.slice(0, 6)); // ✅ Show only the top 3
      } catch (err) {
        setError("Failed to load highlighted news.");
      } finally {
        setLoading(false);
      }
    };
    loadHighlightedNews();
  }, []);

  if (loading)
    return (
      <FullWidthContainer className="text-center">
        <Spinner animation="border" />
      </FullWidthContainer>
    );

  if (error)
    return (
      <FullWidthContainer>
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </FullWidthContainer>
    );
  //TODO if no higlighted news show newest 3 OR hide component

  return (
    <div className="container mt-0">
      <NewsWrapper>
        <StyledTitle className="text-center mb-4">Aktualności</StyledTitle>
        {news.length > 3 ? (
          <StyledCarousel slidesToShow={3}>
            {news.map((article) => (
              <div key={article.id}>
                <StyledCard>
                  {article.imageUrl && (
                    <StyledCardImg
                      $imgHeight="300px"
                      src={`${process.env.REACT_APP_API_URL}/${article.imageUrl}`}
                      alt={article.title}
                    />
                  )}
                  <StyledCard.Body>
                    <StyledCard.Title>{article.title}</StyledCard.Title>
                    <p className="text-muted">
                      {new Date(article.createdDate).toLocaleDateString()} by{" "}
                      {article.createdByName}
                    </p>
                    <NewsContentPreview
                      className="news-content-preview"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    <StyledButton
                      $align="end"
                      onClick={() => navigate(`/news/${article.id}`)}
                    >
                      Więcej
                    </StyledButton>
                  </StyledCard.Body>
                </StyledCard>
              </div>
            ))}
          </StyledCarousel>
        ) : (
          <CardGrid>
            {news.map((article) => (
              <StyledCard key={article.id}>
                {article.imageUrl && (
                  <StyledCardImg
                    $imgHeight="300px"
                    src={`${process.env.REACT_APP_API_URL}/${article.imageUrl}`}
                    alt={article.title}
                  />
                )}
                <StyledCard.Body>
                  <StyledCard.Title>{article.title}</StyledCard.Title>
                  <p className="text-muted">
                    {new Date(article.createdDate).toLocaleDateString()} by{" "}
                    {article.createdByName}
                  </p>
                  <NewsContentPreview
                    className="news-content-preview"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  <StyledButton
                    $align="end"
                    onClick={() => navigate(`/news/${article.id}`)}
                  >
                    Więcej
                  </StyledButton>
                </StyledCard.Body>
              </StyledCard>
            ))}
          </CardGrid>
        )}
      </NewsWrapper>
      <StyledLink to="/News" align="right">
        Wszystkie Aktualności
      </StyledLink>
    </div>
  );
};

export default HighlightedNews;

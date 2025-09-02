import React, { useState, useEffect } from "react";
import { Spinner, Alert, CardImg } from "react-bootstrap";
import { fetchNewsArticles } from "../services/NewsArticleService";
import { useNavigate } from "react-router-dom";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledContainer,
} from "../components/StyledComponents";
import styled from "styled-components";

const NewsArticlesPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNewsArticles = async () => {
      try {
        const data = await fetchNewsArticles();
        setNewsArticles(data);
      } catch (err) {
        setError("Failed to load news articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadNewsArticles();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <div>
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <StyledContainer>
      <StyledTitle className="text-center">Aktualności</StyledTitle>
      {newsArticles.map((article) => (
        <StyledCard
          $horizontal
          $height="350px"
          key={article.id}
          className="mb-4"
        >
          {article.imageUrl && (
            <CardImg
              variant="top"
              src={`http://localhost:5077/${article.imageUrl}`}
              alt={article.title}
              style={{
                maxHeight: "500px",
                width: "30%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          )}
          <StyledCard.Body>
            <StyledCard.Title>{article.title}</StyledCard.Title>
            <p className="text-muted">
              {new Date(article.createdDate).toLocaleDateString()} by{" "}
              {article.createdByName}
            </p>
            <div
              style={{
                marginBottom: "1rem",
                maxHeight: "120px",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{
                __html: article.content.slice(0, 150) + "...",
              }}
            />
            <StyledButton
              $align="end"
              onClick={() => navigate(`/news/${article.id}`)}
            >
              Czytaj
            </StyledButton>
          </StyledCard.Body>
        </StyledCard>
      ))}
    </StyledContainer>
  );
};

export default NewsArticlesPage;

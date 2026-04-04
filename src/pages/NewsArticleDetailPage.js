import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Image } from "react-bootstrap";
import { fetchNewsArticles } from "../services/NewsArticleService";
import { fetchInstructorById } from "../services/instructorService";
import NewsCommentsSection from "../components/NewsCommentsSection";
import InstructorDetailsModal from "../components/InstructorDetailModal";
import styled from "styled-components";
import { getNewsArticleSlug } from "../utils/contentRoutes";

const NewsContainer = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 3rem 1rem;
  line-height: 1.6;
`;

const NewsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const NewsMetadata = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin-bottom: 2rem;
`;

const NewsImage = styled(Image)`
  display: block;
  margin: 0 auto 2rem auto;
  max-width: 100%;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 50px;
`;

const NewsContent = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: justify;
`;

const AuthorLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const NewsArticleDetailsPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [creatorInstructor, setCreatorInstructor] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setArticle(null);
    setCreatorInstructor(null);

    const loadArticle = async () => {
      try {
        const articles = await fetchNewsArticles();
        const matchedArticle = articles.find(
          (newsArticle) => getNewsArticleSlug(newsArticle) === slug
        );

        if (!matchedArticle) {
          setError("Article not found.");
          return;
        }

        setArticle(matchedArticle);

        if (matchedArticle.createdByName.toLowerCase() !== "admin") {
          const instructorData = await fetchInstructorById(
            matchedArticle.createdById
          );
          setCreatorInstructor(instructorData);
        }
      } catch (err) {
        setError("Failed to load the article. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading)
    return (
      <NewsContainer className="text-center">
        <Spinner animation="border" />
      </NewsContainer>
    );

  if (error)
    return (
      <NewsContainer>
        <Alert variant="danger">{error}</Alert>
      </NewsContainer>
    );

  return (
    <NewsContainer>
      <NewsTitle>{article.title}</NewsTitle>

      {article.createdByName.toLowerCase() !== "admin" && (
        <NewsMetadata>
          Published on {new Date(article.createdDate).toLocaleDateString()} by{" "}
          <AuthorLink onClick={() => setShowInstructorModal(true)}>
            {article.createdByName}
          </AuthorLink>
        </NewsMetadata>
      )}

      {article.imageUrl && (
        <NewsImage
          src={`${process.env.REACT_APP_API_URL}/${article.imageUrl}`}
          alt={article.title}
          fluid
        />
      )}

      <NewsContent dangerouslySetInnerHTML={{ __html: article.content }} />

      {article.allowComments && <NewsCommentsSection articleId={article.id} />}

      {creatorInstructor && (
        <InstructorDetailsModal
          show={showInstructorModal}
          onHide={() => setShowInstructorModal(false)}
          instructorId={creatorInstructor.id}
          instructor={creatorInstructor}
        />
      )}
    </NewsContainer>
  );
};

export default NewsArticleDetailsPage;

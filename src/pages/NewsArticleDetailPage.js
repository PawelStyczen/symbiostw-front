import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Image } from "react-bootstrap";
import { fetchNewsArticleById } from "../services/NewsArticleService";
import { fetchInstructorById } from "../services/instructorService";
import NewsCommentsSection from "../components/NewsCommentsSection";
import InstructorDetailsModal from "../components/InstructorDetailModal";
import styled from "styled-components";

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
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInstructorModal, setShowInstructorModal] = useState(false);
  const [creatorInstructor, setCreatorInstructor] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchNewsArticleById(id);
        setArticle(data);

        if (data.createdByName.toLowerCase() !== "admin") {
          const instructorData = await fetchInstructorById(data.createdById);
          setCreatorInstructor(instructorData);
        }
      } catch (err) {
        setError("Failed to load the article. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

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
          src={`http://localhost:5077/${article.imageUrl}`}
          alt={article.title}
          fluid
        />
      )}

      <NewsContent dangerouslySetInnerHTML={{ __html: article.content }} />

      {article.allowComments && <NewsCommentsSection articleId={id} />}

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

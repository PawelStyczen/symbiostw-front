import React, { useState, useEffect } from "react";
import { Alert, Spinner, Form, Button } from "react-bootstrap";
import {
  fetchNewsArticleComments,
  postNewsArticleComment,
} from "../services/NewsArticleService";
import { useAuth } from "./AuthProvider";
import styled from "styled-components";

// Styled Container
const CommentsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// Comment Item
const CommentItem = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  &:last-child {
    border-bottom: none;
  }
`;

// Comment Author
const CommentAuthor = styled.p`
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

// Comment Date
const CommentDate = styled.small`
  color: ${({ theme }) => theme.colors.secondary};
`;

// Styled Form for Adding Comments
const CommentForm = styled(Form)`
  margin-top: 1rem;

  .form-control {
    padding: 0.8rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }

  .btn {
    margin-top: 0.5rem;
  }
`;

const NewsCommentsSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchNewsArticleComments(articleId);
        setComments(data);
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [articleId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const addedComment = await postNewsArticleComment(articleId, newComment);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (err) {
      setError("Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CommentsContainer>
      <h3>Comments</h3>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAuthor>{comment.userName || "Anonymous"}</CommentAuthor>
            <p>{comment.content}</p>
            <CommentDate>
              {new Date(comment.createdDate).toLocaleString()}
            </CommentDate>
          </CommentItem>
        ))
      )}

      {isAuthenticated && (
        <CommentForm onSubmit={handleSubmitComment}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </CommentForm>
      )}
    </CommentsContainer>
  );
};

export default NewsCommentsSection;

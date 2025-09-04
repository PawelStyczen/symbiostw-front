import api from "../utils/api";

export const fetchNewsArticles = async () => {
  try {
    const response = await api.get("/api/Public/PublicNewsArticle");
    return response.data;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    throw error;
  }
};

export const fetchNewsArticleById = async (id) => {
  try {
    const response = await api.get(`/api/Public/PublicNewsArticle/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news article with ID ${id}:`, error);
    throw error;
  }
};

export const fetchNewsArticleComments = async (articleId) => {
  try {
    const response = await api.get(
      `/api/Public/PublicNewsArticle/${articleId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching comments for article ID ${articleId}:`,
      error
    );
    throw error;
  }
};

export const postNewsArticleComment = async (articleId, content) => {
  try {
    const response = await api.post(
      `/api/Public/PublicNewsArticle/${articleId}/comments`,
      { newsArticleId: articleId, content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

export const fetchUserComments = async () => {
  try {
    const response = await api.get("/api/Public/PublicNewsArticle/Comments");
    return response.data;
  } catch (error) {
    console.error("Error fetching user comments:", error);
    throw error;
  }
};
export const fetchHighlightedNews = async () => {
  try {
    const response = await api.get("/api/Public/PublicNewsArticle/highlighted");
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

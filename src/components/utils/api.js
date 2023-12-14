import axios from "axios";

const BASE_URL = "https://nc-news-opvy.onrender.com/api";
const api = axios.create({ baseURL: BASE_URL });

export const getArticles = async (topicSlug) => {
  try {
    const url = topicSlug ? `/articles/?topic=${topicSlug}` : "/articles";
    const response = await api.get(url);
    console.log(response.data.articles)
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles", error);
  }
};
export const getTopics = async () => {
  try {
    const response = await api.get("/topics");
    return response.data.topics;
  } catch (error) {
    console.error("Error fetching topics", error);
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}`);
    return response.data.article;
  } catch (error) {
    console.error(`Error fetching article with ID ${articleId}`, error);
  }
};

export const getUserById = async () => {
  try {
    const response = await api.get("/users/grumpy19");

    return response.data.user;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getCommentsByArticleId = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error(
      `Error fetching comments for article with ID ${articleId}`,
      error
    );
  }
};

export const voteOnArticle = async (articleId, votes) => {
  try {
    const response = await api.patch(`/articles/${articleId}`, {
      inc_votes: votes,
    });
    if (response.status === 200) {
      return response.data.article;
    }
  } catch (error) {
    console.error(`Error voting on article with ID ${articleId}`, error);
    throw error;
  }
};

export const postComment = async (articleId, commentText) => {
  try {
    const response = await api.post(
      `/articles/${articleId}/comments`,
      commentText
    );

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(
      `Error posting comments for article with ID ${articleId}`,
      error
    );
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);

    if (response.status === 204) {
      return;
    }
  } catch (error) {
    console.error(
      `Error deleting comment`,
      error
    );
    throw error;
  }
};

import axios from "axios";

const BASE_URL = "https://nc-news-opvy.onrender.com/api";
const api = axios.create({ baseURL: BASE_URL });

export const getArticles = async () => {
  try {
    const response = await api.get("/articles");

    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles", error);
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
    const response = await api.patch(`/articles/${articleId}`, { inc_votes: votes });
    return response.data.article;
  } catch (error) {
    console.error(`Error voting on article with ID ${articleId}`, error);
  }
};
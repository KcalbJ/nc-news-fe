
import axios from "axios";


const BASE_URL = "https://nc-news-opvy.onrender.com/api";
const api = axios.create({ baseURL: BASE_URL });

export const getArticles = async () => {
  try {
    const response = await api.get("/articles");
    
    return response.data.articles
  } catch (error) {
    console.error("Error fetching articles", error);
    throw error;
  }
};


export const getUserById = async () => {
  try {
    const response = await api.get("/users/grumpy19");
    
    return response.data.user
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};
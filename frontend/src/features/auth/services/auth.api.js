import axios from "axios";

const api = axios.create({
  baseURL: "https://genai-project-full-stack-backend.onrender.com",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.post(
      "/api/auth/logout",
      {}, // body empty hai
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
}

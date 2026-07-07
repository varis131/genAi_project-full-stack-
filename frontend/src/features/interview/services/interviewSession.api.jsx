import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// @description: Start a new live interview session for a given interview report
export const startLiveInterview = async (interviewReportId) => {
  const response = await api.post(`/api/interview-session/${interviewReportId}/start`);
  return response.data;
};

// @description: Submit an answer for the current question in a session
export const submitInterviewAnswer = async (sessionId, answer) => {
  const response = await api.post(`/api/interview-session/${sessionId}/answer`, { answer });
  return response.data;
};

// @description: Get a single live interview session
export const getLiveInterviewSession = async (sessionId) => {
  const response = await api.get(`/api/interview-session/${sessionId}`);
  return response.data;
};

// @description: Get all live interview sessions for the logged-in user
export const getAllLiveInterviewSessions = async () => {
  const response = await api.get(`/api/interview-session`);
  return response.data;
};

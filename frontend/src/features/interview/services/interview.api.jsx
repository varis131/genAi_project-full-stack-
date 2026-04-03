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


//** Interview API Functions 
// @description: Generate an interview report based on provided details
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview/report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


// @description: Retrieve an interview report by its ID
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};


// @description: Retrieve all interview reports for the logged-in user
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview");
  return response.data;
};


// @description: Generate a PDF resume based on an interview report
export const generateResumePdf = async (interviewReportId) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    {},
    {
      responseType: "blob",
    },
  );

  return response.data;
};

// @description: Delete an interview report by its ID
export const deleteInterviewReport = async (interviewId) => {
  const response = await api.delete(`/api/interview/report/${interviewId}`);
  return response.data;
};

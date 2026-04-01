import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf,
  deleteInterviewReport,
} from "../services/interview.api";

import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.error("Error generating interview report:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (error) {
      console.error("Error fetching interview report:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.error("Error fetching interview reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResumePdf = async (interviewReportId) => {
    try {
      const pdfBlob = await generateResumePdf(interviewReportId);

      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating resume PDF:", error);
    }
  };

  const deleteReport = async (interviewId) => {
    try {
      await deleteInterviewReport(interviewId);
      // Remove the deleted report from local state if it exists
      if (reports) {
        setReports(reports.filter((r) => r._id !== interviewId));
      }
    } catch (error) {
      console.error("Error deleting interview report:", error);
    }
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    downloadResumePdf,
    deleteReport,
  };
};

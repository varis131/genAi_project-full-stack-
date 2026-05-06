import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import AnalyzerPage from "./features/analyzer/pages/AnalyzerPage";
import Protected from "./features/auth/components/Protected";
import MainLayout from "./layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AnalyzerPage />, // Sets the premium Analyzer Page as the landing page
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: (
      <Protected>
        <MainLayout />
      </Protected>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/interview/:interviewId",
        element: <Interview />,
      },
    ],
  },
]);
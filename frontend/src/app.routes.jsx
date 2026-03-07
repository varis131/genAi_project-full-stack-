import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Hero from "./features/auth/pages/Hero";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Protected><Hero/></Protected>,
  },
  {
    path: "/home",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/interview/:interviewId",
    element: <Protected><Interview/></Protected>,
  }
]);

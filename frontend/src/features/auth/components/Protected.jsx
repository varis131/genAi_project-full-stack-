import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;

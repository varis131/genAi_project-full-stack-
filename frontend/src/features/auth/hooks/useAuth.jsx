import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error; // optional: agar component me handle karna ho
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};

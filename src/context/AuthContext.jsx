import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SpinnerLoading from "../components/elements/SpinnerLoading";

const AuthContext = createContext(null);

const isTokenExpired = (exp) => {
  return Date.now() >= exp * 1000;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token) => {
    if (!token) {
      console.error("Invalid token");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (isTokenExpired(decoded.exp)) {
        console.warn("Token expired");
        logout();
        return;
      }

      const userData = {
        id: decoded.userId,
        // Tambah property lain dari token kalau ada
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setAccessToken(token);
      setUser(userData);
    } catch (err) {
      console.error("Token decode failed", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token", decoded);

        if (isTokenExpired(decoded.exp)) {
          logout();
        } else {
          setAccessToken(token);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error decoding token on load", err);
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, logout, isLoading }}
    >
      {isLoading ? <SpinnerLoading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

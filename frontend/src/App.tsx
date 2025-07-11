import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useLoading } from "./hooks/useLoading";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/Loader";

export default function App() {
  const { isLoading } = useLoading();
  const { isLoadingAuth, isAuthenticated } = useAuth();

  return (
    <>
      {isLoading && <Loader />}

      <BrowserRouter>
        {/* 🔒 Só renderiza rotas após verificar auth */}
        {isLoadingAuth ? (
          <Loader />
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

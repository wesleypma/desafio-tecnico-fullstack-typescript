import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  // Verifica se o usuário está logado
  const token = localStorage.getItem("token");

  // Senão estiver logado, redireciona para /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

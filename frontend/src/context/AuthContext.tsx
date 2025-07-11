import { createContext, useState, useEffect } from "react";
import api from "../api/api";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  pokemons: any[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const isAuthenticated = !!token;

  // Inicializa usuário e pokémons após login ou ao recarregar a página
  const initializeAuth = async (token: string) => {
    try {
      const response = await api.get("/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
      setPokemons(response.data.pokemons);
    } catch (error: any) {
      console.error("Erro ao recuperar usuário:", error);

      // Se for erro 401 ou 403, desloga
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      } else {
        // Se for erro de rede ou servidor, apenas loga o erro
        console.warn("Erro de rede ou servidor instável. Mantendo sessão.");
      }
    }
  };

  // Roda uma única vez ao iniciar a aplicação
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setIsLoadingAuth(false);
      return;
    }

    setToken(storedToken);
    initializeAuth(storedToken).finally(() => setIsLoadingAuth(false));
  }, []);

  // NOVO: login com email/senha
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;

      localStorage.setItem("token", token);
      setToken(token);

      await initializeAuth(token);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      logout();
      throw error; // permite o componente lidar com o erro
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setPokemons([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoadingAuth,
        login,
        logout,
        pokemons,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

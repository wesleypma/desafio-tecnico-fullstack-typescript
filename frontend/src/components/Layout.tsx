// src/components/Layout.tsx
import { useAuth } from "../hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-green-600">iGreen Admin</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Sair
            </button>
          </div>
        )}
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6">{children}</main>

      {/* Rodapé opcional */}
      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} iGreen Energy
      </footer>
    </div>
  );
}

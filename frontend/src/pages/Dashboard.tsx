import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { user, pokemons, isAuthenticated } = useAuth();

  // Se o usuário não estiver mais autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <section className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Bem-vindo, <span className="text-blue-600">{user?.email}</span>
          </h2>
          <h3 className="text-lg font-semibold text-green-600">Pokémons</h3>
        </div>

        {/* Grade de Pokémons */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemons?.map((poke: any, index: number) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              <div className="mb-2 text-blue-500 font-bold text-sm">
                #{poke.id || index + 1}
              </div>
              <h4 className="text-lg font-semibold capitalize text-gray-800">
                {poke.name || poke.title || `Pokémon ${index + 1}`}
              </h4>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

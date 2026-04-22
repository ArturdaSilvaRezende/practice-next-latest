import { HeroBanner } from "./_components/Banner";
import { FeatureCard } from "./_components/Cards";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

import { api } from "@/lib/api";
import { FileText, Layers, Users, MapPin } from "lucide-react"; // Exemplo de ícones

interface ModuleData {
  title: string;
  description: string;
  indicators: Record<string, string>; // Aceita qualquer chave de string com valor string
}

export default async function Modules() {
  const { data: modules } = (await api.get("/modules")) as {
    data: ModuleData[];
  };

  // Função auxiliar para mapear os indicadores da API para o formato do componente
  const mapIndicatorsToMetadata = (indicators: Record<string, string>) => {
    return Object.entries(indicators).map(([key, value]) => {
      return {
        // Você pode definir um ícone padrão ou um mapeamento por chave
        icon: <Layers className="w-4 h-4" />,
        label: value,
      };
    });
  };

  return (
    <main>
      <Navbar />
      <HeroBanner />

      <section className="container mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <FeatureCard
            key={index}
            title={module.title}
            description={module.description}
            // Fallback para imagem caso a API não envie
            imageSrc="/placeholder-image.jpg"
            imageAlt={module.title}
            // Transformação dos dados da API para o componente
            metadata={mapIndicatorsToMetadata(module.indicators)}
          />
        ))}
      </section>

      <Footer />
    </main>
  );
}

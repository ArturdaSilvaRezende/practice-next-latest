import { HeroBanner } from "./_components/Banner";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import { api } from "@/lib/api";

// Definindo o que compõe um módulo individual
interface ModuleData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  // Se houver metadados vindo da API, tipamos aqui também
  metadata?: {
    icon: string;
    label: string;
  }[];
}

export default async function Modules() {
  const { data: modules } = await api.get("/modules");

  console.log("Módulos carregados:", modules); // Log para verificar os dados

  return (
    <main>
      <Navbar />
      <HeroBanner />
      {/* <section className="container mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module: ModuleData) => (
          <FeatureCard
            key={module.id}
            title={module.title}
            description={module.description}
            imageSrc={module.imageSrc}
            imageAlt={module.imageAlt}
            metadata={module.metadata || []} // Aqui você pode mapear os ícones se necessário
          />
        ))}
      </section> */}
      <Footer />
    </main>
  );
}

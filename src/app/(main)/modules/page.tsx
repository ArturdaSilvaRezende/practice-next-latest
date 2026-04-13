import { HeroBanner } from "./_components/Banner";
import { FeatureCard } from "./_components/Cards";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

export default function Modules() {
  return (
    <main>
      <Navbar />
      <HeroBanner />
      <section className="container mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          title="Processos e Documentos"
          description="Gestão de processos e documentos para otimizar fluxos de trabalho e garantir eficiência e segurança."
          imageSrc={`/images/modules-thumb-process.svg`}
          imageAlt="Processos e Documentos"
          metadata={[]}
        />
        <FeatureCard
          title="Modelos"
          description="Gestão de modelos para otimizar processos e garantir eficiência e consistência."
          imageSrc={`/images/modules-thumb-models.svg`}
          imageAlt="Modelos"
          metadata={[]}
        />
        <FeatureCard
          title="Usuários e Permissões"
          description="Gestão de usuários e permissões para garantir controle de acesso e segurança nas operações."
          imageSrc={`/images/modules-thumb-users.svg`}
          imageAlt="Usuários e Permissões"
          metadata={[]}
        />
        <FeatureCard
          title="Unidades"
          description="Gestão de unidades para organizar e controlar diferentes localizações ou departamentos de forma eficiente."
          imageSrc={`/images/modules-thumb-unitys.svg`}
          imageAlt="Unidades"
          metadata={[]}
        />
      </section>
      <Footer />
    </main>
  );
}

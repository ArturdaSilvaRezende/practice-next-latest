import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processos",
  description: "Página dedicada à gestão e acompanhamento de processos, oferecendo uma visão clara e organizada de todas as etapas envolvidas. Aqui, os usuários podem acessar informações detalhadas sobre cada processo, monitorar seu progresso e tomar decisões informadas para garantir a eficiência e o sucesso das operações.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Aside />
      <div>
        <Header />
        <section className="min-h-full flex flex-col">{children}</section>
        <Footer />
      </div>
    </main>
  );
}

import { Settings } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background overlay with subtle pattern */}
      <div
        className=" absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banner-modules.jpg')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute z-10 inset-0 bg-linear-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />

      {/* Content */}
      <div className="relative z-20 py-10 container mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Settings className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Signify
          </h1>
        </div>
        <p className="text-gray-300 max-w-2xl leading-relaxed">
          Automação inteligente para otimizar e agilizar seus processos,
          garantindo eficiência e fluidez em cada etapa do seu fluxo de
          trabalho.
        </p>
      </div>
    </section>
  );
}

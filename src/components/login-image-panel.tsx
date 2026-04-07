import Image from "next/image"

export function LoginImagePanel() {
  return (
    <div className="relative hidden h-screen w-1/2 lg:block">
      {/* Background Image */}
      <Image
        src="/images/login-bg.jpg"
        alt="Pessoa assinando documento em ambiente corporativo"
        fill
        className="object-cover"
        priority
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Overlay Text */}
      <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-12">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Simplifique Suas Assinaturas
        </h2>
        <p className="mt-3 max-w-md text-pretty text-lg text-white/80">
          Automação inteligente para o seu fluxo de trabalho
        </p>
      </div>
    </div>
  )
}

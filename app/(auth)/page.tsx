import Image from "next/image";
import { LoginForm } from "./_components/Form";
import { LoginBanner } from "./_components/Banner";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <LoginForm />
      <LoginBanner />
    </main>
  );
}

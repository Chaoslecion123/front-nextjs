import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => router.push("/auth/login")}
        className="bg-orange-200 p-4 rounded-md"
      >
        Login
      </button>
    </main>
  );
}

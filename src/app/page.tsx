"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LendingPage() {
  const router = useRouter();
  const sendToLoginPage = () => {
    router.push("/login");
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Button className="cursor-pointer" onClick={sendToLoginPage}>
        Entrar
      </Button>
    </div>
  );
}

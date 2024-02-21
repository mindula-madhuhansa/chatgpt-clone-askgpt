"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#10A27E] h-screen flex flex-col items-center justify-center text-center">
      <Image src="/assets/loginLogo.png" width={160} height={160} alt="Logo" />
      <button
        onClick={() => signIn()}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign In to use AskGPT
      </button>
    </div>
  );
}

export default Login;

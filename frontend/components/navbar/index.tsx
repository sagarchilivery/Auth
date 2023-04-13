import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="w-screen h-14 px-10 items-center bg-[#272727] flex justify-between">
      <div className="text-4xl">AUTH</div>
      <div className="flex text-xl gap-5">
        <div
          onClick={() => {
            router.push("/login");
          }}
          className=""
        >
          Login
        </div>
        <div
          onClick={() => {
            router.push("/signup");
          }}
          className=""
        >
          SignUp
        </div>
      </div>
    </div>
  );
}

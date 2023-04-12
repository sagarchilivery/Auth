import Baselayout from "@/components/baselayout";
import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState<any>({
    email: "",
    password: "",
  });

  async function LoginFunction() {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email: data.email, password: data.password }
      );
      console.log(response);
      setData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const sendToBackend = (e: any) => {
    e.preventDefault();
    LoginFunction().then(() => {
      router.push("/");
    });
  };
  function handleInp(e: any) {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Baselayout>
      <div className=" flex flex-col justify-center items-center gap-5 ">
        <form
          className=" flex flex-col justify-center items-center gap-5 "
          onSubmit={sendToBackend}
        >
          <label>email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            className="text-black"
            // onChange={(e) => handleInp(e.target.value)}
            onChange={(e) => handleInp(e)}
            id="email"
          />
          <label>password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => handleInp(e)}
            className="text-black"
            // onChange={(e) => handleInp(e.target.value)}
            id="password"
          />
          <input
            type="submit"
            value="Login"
            className="border px-5"
            name=""
            id=""
          />
        </form>
      </div>
    </Baselayout>
  );
}

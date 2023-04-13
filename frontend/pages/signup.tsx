// import Baselayout from '@/components/baselayout'
// import React from 'react'

// export default function signup() {
//   return (
//     <Baselayout>signup</Baselayout>
//   )
// }

import Baselayout from "@/components/baselayout";
import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  async function SignUpFunction() {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        { name: data.name, email: data.email, password: data.password }
      );
      console.log(response);
      setData({
        name: "",
        email: "",
        password: "",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const sendToBackend = (e: any) => {
    e.preventDefault();
    console.log(data);

    SignUpFunction();
  };
  function handleInp(e: any) {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Baselayout>
      <div>
        <form
          className=" flex flex-col justify-center items-center gap-5 "
          onSubmit={sendToBackend}
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => handleInp(e)}
            className="text-black"
            // onChange={(e) => handleInp(e.target.value)}
            id="name"
          />
          <label>email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            className="text-black"
            onChange={(e) => handleInp(e)}
            // onChange={(e) => handleInp(e.target.value)}
            id="email"
          />
          <label>password</label>
          <input
            type="text"
            name="password"
            value={data.password}
            className="text-black"
            onChange={(e) => handleInp(e)}
            // onChange={(e) => handleInp(e.target.value)}
            id="password"
          />
          <input
            type="submit"
            value="signin"
            className=" border  px-5"
            name=""
            id=""
          />
        </form>
      </div>
    </Baselayout>
  );
}

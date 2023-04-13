import Head from "next/head";
import React, { ReactNode } from "react";
import { FC } from "react";
import Navbar from "../navbar";

interface baselayoutProps {
  title?: string;
  children?: ReactNode;
}

const Baselayout: FC<baselayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="text-white">
        <Navbar />
      </div>
      <div className="">{children}</div>
    </>
  );
};
export default Baselayout;

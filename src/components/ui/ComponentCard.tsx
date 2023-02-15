import { Component } from "@prisma/client";
import React from "react";

type Props = {
  data: Component;
};

const Icon = () => {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 1H1V5.5H2V2H5.5V1Z" fill="#344054" />
      <path d="M1 10.5V15H5.5V14H2V10.5H1Z" fill="#344054" />
      <path d="M15 5.5V1H10.5V2H14V5.5H15Z" fill="#344054" />
      <path d="M10.5 15H15V10.5H14V14H10.5V15Z" fill="#344054" />
      <path
        d="M12.745 5.065L8.24502 2.565C8.16901 2.52112 8.08279 2.49802 7.99502 2.49802C7.90726 2.49802 7.82103 2.52112 7.74502 2.565L3.24502 5.065C3.16965 5.10969 3.10735 5.17339 3.06435 5.24974C3.02135 5.32608 2.99917 5.41239 3.00002 5.5V10.5C3.00018 10.5886 3.02387 10.6756 3.06867 10.752C3.11348 10.8284 3.17779 10.8916 3.25502 10.935L7.75502 13.435C7.83103 13.4789 7.91726 13.502 8.00502 13.502C8.09279 13.502 8.17901 13.4789 8.25502 13.435L12.755 10.935C12.8304 10.8903 12.8927 10.8266 12.9357 10.7503C12.9787 10.6739 13.0009 10.5876 13 10.5V5.5C12.9999 5.41141 12.9762 5.32444 12.9314 5.24801C12.8866 5.17157 12.8223 5.10842 12.745 5.065ZM8.00002 3.57L11.47 5.5L8.00002 7.43L4.53002 5.5L8.00002 3.57ZM4.00002 6.35L7.50002 8.295V12.15L4.00002 10.205V6.35ZM8.50002 12.15V8.295L12 6.35V10.205L8.50002 12.15Z"
        fill="#344054"
      />
    </svg>
  );
};

const ComponentCard = ({ data }: Props) => {
  const styles = {
    container:
      "bg-white p-4 aspect-[3/2.5]  group relative flex items-center hover:bg-gray-300 duration-200 ease-out  hover:border-gray-400 justify-center border rounded-lg",
    copyButton:
      "hidden group-hover:flex absolute bg-white bottom-4 items-center justify-center gap-2 py-2 rounded-lg px-4 shadow-xl border border-gray-400 active:bg-gray-200 active:scale-95 duration-100 ease-out font-semibold",
  };
  return (
    <div className={styles.container}>
      Loading ....
      <button className={styles.copyButton}>
        <Icon />
        Copy To Figma
      </button>
    </div>
  );
};

export default ComponentCard;

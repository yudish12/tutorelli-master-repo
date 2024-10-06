import Image from "next/image";
import Link from "next/link";
import React from "react";

const OpenZoom = ({
  linkText,
  zoomLink,
}: {
  linkText: string;
  zoomLink?: string;
}) => {
  console.log(zoomLink, 6);
  return (
    <Link
      className="text-primary flex gap-2 items-center text-md min-w-[100px]"
      href={zoomLink ?? ""}
    >
      {linkText}
      <Image src={"/zoom-icon.svg"} alt="zoom-icon" width={20} height={20} />
    </Link>
  );
};

export default OpenZoom;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const TutorRow = ({ item }: { item: { id: string; full_name: string } }) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex gap-4 items-center">
        <Image src={"/SamplePFP.png"} alt="pfp" width={40} height={40} />
        <span className="text-lg font-medium capitalize ml-2">
          {item.full_name}
        </span>
      </div>
      <Link href={"#"} className="text-primary">
        Contact Your Tutor
      </Link>
    </div>
  );
};

export default TutorRow;

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import { Cloud } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadNotes = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 3,
      onDropAccepted: (acceptedFiles) => {
        setFiles((prev) => [...prev, ...acceptedFiles]);
      },
    });
  return (
    <div className="flex justify-center flex-col items-center">
      <Heading level={5} className="mt-2">
        Upload Notes
      </Heading>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={cn(
          "w-full max-w-2xl mt-2 cursor-pointer rounded-lg border border-dashed p-16 transition-colors hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-500/10",
          {
            "border-green-500 bg-green-50 dark:bg-green-500/10": isDragAccept,
            "border-red-500 bg-red-50 dark:bg-red-500/10": isDragReject,
          }
        )}
      >
        <input {...getInputProps()} />

        <div className={"flex flex-col items-center space-y-4"}>
          <div className={"flex flex-col items-center space-y-4"}>
            <Cloud className={"w-24"} />

            <h3 className="text-2xl font-semibold">
              Drag and drop your document here
            </h3>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">or</h3>
          </div>

          <div>
            <Button>Upload Document from Computer</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNotes;

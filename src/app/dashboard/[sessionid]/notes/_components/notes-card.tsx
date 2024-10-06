"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect, useState } from "react";
import UploadNotes from "./upload-notes";
import { roles } from "@/config/contants";
import { downloadFile, getNotes } from "../server-actions";
import { Notes } from "@/lib/types/global.types";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Cross, DeleteIcon, DownloadCloud, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const NotesCard = ({ sessionid }: { sessionid: string | number }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Notes[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const getNotesAsync = async () => {
    try {
      const notesData = await getNotes(sessionid);
      setNotes(notesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFileFunc = async (title: string) => {
    try {
      const response = await fetch(
        `/api/notes/download?name=${encodeURIComponent(title)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob(); // Convert the response to a Blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error downloading the file.",
      });
    }
  };

  const uploadNotesFunc = async () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("sessionid", sessionid.toString());
    try {
      const response = await fetch("/api/notes/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      toast({
        variant: "default",
        title: data.success ? "Successfully uploaded notes" : "Error",
        description: data.success ? "Successfully uploaded notes" : "Error",
      });

      setFiles([]);
      setLoading(true);
      getNotesAsync();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error",
      });
    }
  };

  useEffect(() => {
    getNotesAsync();
  }, []);

  return (
    <Card className="mt-4 border-none shadow-none">
      <CardContent>
        <div className="flex flex-col gap-4">
          {user?.role === roles.TUTOR && (
            <UploadNotes files={files} setFiles={setFiles} />
          )}
          {user?.role === roles.TUTOR && (
            <>
              {files.length > 0 && (
                <div className="flex flex-col">
                  <h3 className="text-lg text-center font-semibold">
                    Your selected files
                  </h3>
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="w-full border flex items-center justify-between py-2 px-1 rounded-sm gap-2 mt-2"
                    >
                      <div className="flex items-center gap-2 mx-auto">
                        <Image
                          src={"/pdf-icon.svg"}
                          alt="preview"
                          width={20}
                          height={20}
                        />
                        <h3 className="text-sm text-ellipsis overflow-hidden whitespace-nowrap w-[200px] text-center">
                          {file.name}
                        </h3>
                      </div>
                      <div
                        onClick={() =>
                          setFiles(
                            files.filter((item) => item.name !== file.name)
                          )
                        }
                        className="cursor-pointer mr-2"
                      >
                        <Trash2 color="red" className="w-5 h-5 self-end " />
                      </div>
                    </div>
                  ))}
                  <Button onClick={uploadNotesFunc} className="mt-4">
                    Upload Notes
                  </Button>
                </div>
              )}
            </>
          )}
          <div>
            <h3 className="font-medium text-center text-sm">Your notes</h3>
            {loading ? (
              <div className="grid grid-rows-3 gap-y-2 mt-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <>
                {notes.map((item) => (
                  <div
                    className="rounded-md flex justify-between gap-2 bg-primary/10 p-2 mt-2"
                    key={item.id}
                  >
                    <div className="flex items-center gap-2 mx-auto">
                      <h3 className="text-sm text-ellipsis overflow-hidden whitespace-nowrap text-center flex gap-2 justify-center">
                        <Image
                          src={"/pdf-icon.svg"}
                          alt="preview"
                          width={20}
                          height={20}
                        />
                        {item.title.substring(0, 20)}
                      </h3>
                    </div>
                    <div
                      onClick={() => downloadFileFunc(item.title)}
                      className="h-4 w-4 mr-2 cursor-pointer"
                    >
                      <DownloadCloud
                        color="green"
                        className="w-5 h-5 self-end "
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesCard;

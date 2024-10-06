import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NotesCard from "../../[sessionid]/notes/_components/notes-card";

const NotesDialog = ({ sessionid }: { sessionid: number | string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        //   onClick={() => router.replace(`/dashboard/${sessionData.id}/notes`)}
        >
          Notes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <NotesCard sessionid={sessionid} />
      </DialogContent>
    </Dialog>
  );
};

export default NotesDialog;

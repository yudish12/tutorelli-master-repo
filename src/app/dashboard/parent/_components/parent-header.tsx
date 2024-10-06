"use client";
import React from "react";
import DashboardHeader from "../../_components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { inviteStudent } from "../server-actions/students-actions";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { RotatingLines } from "react-loader-spinner";

const StudentInviteDialog = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const { user_info } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const inviteStudentAsync = async (email: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await inviteStudent(email, user_info?.id);
      console.log(res);
      if (!res.success) {
        setError(res.error ?? "Something went wrong");
        return;
      }
      toast({
        variant: "default",
        title: "Student Invited Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    return () => setError(undefined);
  }, []);

  return (
    <Dialog onOpenChange={(open) => (!open ? setError(undefined) : "")}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Invite Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Label htmlFor="email" className="text-sm">
          Enter student email
        </Label>
        <div className="flex gap-2 w-full">
          <Input
            containerClasses="w-full"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student email"
          />
          {loading && (
            <RotatingLines
              visible={true}
              //@ts-ignore
              height="20"
              width="20"
              color="#2563EB"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass="text-primary"
            />
          )}
        </div>
        {error && <p>{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button onClick={() => inviteStudentAsync(email)}>Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Parentheader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-start">
        <DashboardHeader />
      </div>
      <StudentInviteDialog />
    </div>
  );
};

export default Parentheader;

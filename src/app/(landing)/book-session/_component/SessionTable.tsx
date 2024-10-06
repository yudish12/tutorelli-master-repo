import { sessionBookingCols } from "@/components/columns/session-booking";
import { DataTable } from "@/components/ui/data-table";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { SessionTableType } from "@/lib/types/table.types";
import { Button } from "@/components/ui/button";
import { SessionBookingData } from "@/lib/types/action.types";
import { useAuth } from "@/context/AuthProvider";
import { useParentContext } from "@/context/ParentProvider";
import { cn } from "@/lib/utils";
import moment from "moment";
import { BookingDialog } from "./booking-modal";

const SessionTable = ({ sessions }: { sessions: SessionBookingData[] }) => {
  const { user, user_info } = useAuth();
  const landingPage = window?.location.href.includes("/dashboard");
  const { selectedStudent } = useParentContext();
  const role = user?.role;
  const student_id = role === "student" ? user_info?.id : selectedStudent.value;

  const [email, setEmail] = useState(user?.email ?? "");

  let data: SessionTableType[] = sessions.map((session) => ({
    ...session,
    yeargroup: (
      <span className="text-base">{session?.subject?.class?.name}</span>
    ),
    Tutor: (
      <div className="flex items-center justify-center gap-2">
        <Image src={"/SamplePFP.png"} alt="pfp" width={30} height={30} />
        <span className="text-sm">{session?.tutors?.full_name}</span>
      </div>
    ),
    subject: (
      <Badge
        className={`w-full flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths`}
      >
        {session?.subject?.name}
      </Badge>
    ),
    capacity: (
      <Badge
        className={cn(
          "w-full h-[30px] min-w-[40px] flex items-center justify-center rounded-md p-2 bg-indigo text-white shadow-none hover:bg-indigo/90",
          session.capacity === 0 && "bg-red-500 hover:bg-red-500/90"
        )}
      >
        {session.capacity}
      </Badge>
    ),
    from: (
      <span className="text-base flex max-w-[180px] overflow-auto">
        {`${moment(session?.start_date).format("DD MMM, hh:mm A")} - ${moment(
          session?.end_date
        ).format("DD MMM, hh:mm A")}`}
      </span>
    ),
    sessionbooking: (
      <form
        action={`/api/book-session`}
        method="POST"
        id={`booking-form-${session?.id}`}
        className="text-primary text-base"
      >
        <input type="hidden" name="block_id" value={session?.id} />
        {landingPage && (
          <input type="hidden" name="student_id" value={student_id ?? ""} />
        )}
        <input type="hidden" name="email" value={email} />
        {!landingPage && session.capacity !== 0 ? (
          <BookingDialog
            email={email}
            setEmail={setEmail}
            formid={`booking-form-${session?.id}`}
            price={session?.price}
          />
        ) : (
          <Button
            disabled={session.capacity === 0}
            type="submit"
          >{`Book for ${session?.price}$`}</Button>
        )}
      </form>
    ),
  }));

  return (
    <div className="w-full max-h-[400px] mt-6 overflow-auto">
      <DataTable columns={sessionBookingCols} data={data} />
    </div>
  );
};

export default SessionTable;

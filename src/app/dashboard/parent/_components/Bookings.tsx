import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ParentBookingType } from "@/lib/types/action.types";
import moment from "moment";
import Image from "next/image";
import React from "react";

const Bookings = ({ bookings }: { bookings: ParentBookingType[] }) => {
  return (
    <Card className="w-full h-full mt-4">
      <CardHeader>
        <CardTitle className="capitalize">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {bookings?.map((item) => (
            <div key={item.block_id} className="flex gap-4 items-center">
              <span>Children</span>
              <span className="text-primary">
                {moment(item.start_date).format("DD/MM/YYYY")}
              </span>
              <Image
                src={"/SampleAvatar.png"}
                alt="pfp"
                width={40}
                height={40}
              />
              <Badge className="w-1/6 flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths">
                {item.subject_name}
              </Badge>
              <div className="text-primary">
                sessions : {item.completed_sessions}/{item.total_sessions}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookings;

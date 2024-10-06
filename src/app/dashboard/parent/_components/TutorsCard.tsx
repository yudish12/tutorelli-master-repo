import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import TutorRow from "./TutorRow";

const TutorsCard = ({
  tutors,
}: {
  tutors: { id: string; full_name: string }[];
}) => {
  return (
    <Card className="w-full h-full mt-4 mb-6">
      <CardHeader>
        <CardTitle>Your Childs Tutors</CardTitle>
      </CardHeader>
      <CardContent>
        {tutors.map((item) => (
          <TutorRow item={item} key={item.id} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TutorsCard;

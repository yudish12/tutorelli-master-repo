import React from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const AdminDashboardCards = ({ name, url }: { name: string; url: string }) => {
  return (
    <Card>
      <CardHeader className="text-2xl capitalize font-semibold">
        {name}
      </CardHeader>
      <CardFooter className="text-primary">
        <Link
          href={url}
          className="text-white p-2 rounded-xl bg-primary text-sm"
        >
          Go to {name}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AdminDashboardCards;

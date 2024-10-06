"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock5, LinkIcon, Users } from "lucide-react";
import Link from "next/link";
import OpenZoom from "../../../_components/OpenZoom";
import { SessionDataReturned } from "../server-actions/response.types";
import { roles, SessionStatus } from "@/config/contants";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import NotesDialog from "./NotesDialog";
import moment from "moment";
import { Heading } from "@/components/ui/heading";
const SessionCard = ({
  sessionData,
  role,
}: {
  sessionData: SessionDataReturned;
  role?: string;
}) => {
  const router = useRouter();
  return (
    <Card className="w-full h-full overflow-auto">
      <div className="flex justify-between pr-6 items-center">
        <Image
          className="m-4 mb-0 mx-6"
          src={"/SamplePFP.png"}
          alt="sample"
          width={60}
          height={60}
        />
        <Link className="text-primary" href="#">
          Contact
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="capitalize">
          {sessionData.session_block.tutors.full_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <Heading level={6}>
              Session Name:&nbsp;
              <span className="text-lg font-semibold text-primary">
                {sessionData.name}
              </span>
            </Heading>
          </div>
          <div className="flex gap-4 items-center">
            <Image
              src={"/notebook.svg"}
              alt="notebook"
              width={20}
              height={20}
            />
            <div className="flex gap-4">
              <Badge
                className={`w-full capitalize flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths`}
              >
                {sessionData.session_block.subject.name}
              </Badge>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <LinkIcon color="#667080" className="w-5 h-5" />
            <OpenZoom
              linkText={
                sessionData.recording !== "not-yet"
                  ? "Watch Recording"
                  : "Open Zoom"
              }
              zoomLink={
                sessionData.recording !== "not-yet"
                  ? sessionData.recording
                  : role !== "tutor"
                  ? sessionData.join_url
                  : sessionData.url
              }
            />
          </div>
          <div className="flex gap-4 items-center">
            <Clock5 color="#667080" className="w-5 h-5" />
            <span className="text-primary capitalize">
              {sessionData.status}
            </span>
            <span className="text-primary">
              {moment(sessionData.from).format("DD MMM, hh:mm A (ddd)")}
            </span>
          </div>
          {roles.TUTOR === role && (
            <div className="flex gap-4 items-center">
              <Users color="#667080" className="w-5 h-5" />
              <Link
                className="text-primary"
                href={`/dashboard/${sessionData.id}/students`}
              >
                Students
              </Link>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {sessionData.status === SessionStatus.COMPLETED &&
          role !== roles.PARENT && (
            <>
              <Button
                onClick={() => router.push(`/dashboard/${sessionData.id}/quiz`)}
              >
                Quiz
              </Button>
              <Button
                onClick={() =>
                  router.push(`/dashboard/${sessionData.id}/flashcards`)
                }
              >
                Flashcards
              </Button>

              <NotesDialog sessionid={sessionData.id} />
            </>
          )}
      </CardFooter>
    </Card>
  );
};

export default SessionCard;

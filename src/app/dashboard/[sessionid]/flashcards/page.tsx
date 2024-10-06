"use client";
import React, { useEffect } from "react";
import { getFlashCardBySessionId, publishFlashcards } from "./server-actions";
import RotateCards from "./_components/rotating-cards";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { generateUUID } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import { roles } from "@/config/contants";
import { Skeleton } from "@/components/ui/skeleton";
import EditableCard from "./_components/editable-cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";

const Flashcards = () => {
  const { sessionid } = useParams<{ sessionid: string }>();
  const [loading, setLoading] = React.useState(true);
  const { user, isLoading } = useAuth();
  const [flashcardData, setFlashcardData] = React.useState<any[]>([]);
  const [isAdding, setIsAdding] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fc_id = searchParams.get("flashcard_id");

  const get = async () => {
    setLoading(true);
    const data = await getFlashCardBySessionId(sessionid, user?.role ?? "");
    if (fc_id) {
      setFlashcardData([data.find((item) => item.id === fc_id)]);
      setLoading(false);
      return;
    }
    setFlashcardData(data);
    setLoading(false);
  };

  const publishFlashcardFunc = async () => {
    try {
      const data = await publishFlashcards(sessionid);
      if (data.success) {
        toast({
          variant: "default",
          title: "Flashcard published successfully",
          description: `Flashcard published successfully`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error publishing flashcard",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error publishing flashcard",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (isLoading) return;
    get();
  }, [sessionid, fc_id, isLoading]);

  if (loading)
    return (
      <div className="grid lg:grid-cols-3 gap-x-2 gap-y-2 grid-cols-2 ">
        {...Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
        ))}
      </div>
    );

  if (flashcardData.length === 0 && !loading)
    return <div>No flashcards found</div>;

  return (
    <>
      <div className="w-full flex justify-between">
        <h2 className="text-3xl font-semibold capitalize mb-6">
          {flashcardData[0].sessions.session_block.subject.name +
            " " +
            flashcardData[0].sessions.session_block.subject.class.name}
        </h2>
        {user?.role === roles.TUTOR && flashcardData[0].published === false && (
          <Button onClick={publishFlashcardFunc}>Publish All</Button>
        )}
      </div>
      {user?.role === roles.TUTOR ? (
        <div className="flex flex-col gap-4">
          {flashcardData.map((item, index) => (
            <EditableCard
              key={item.id}
              id={item.id}
              index={index}
              published={item.published}
              session_id={sessionid}
              front={item.front}
              setIsAdding={setIsAdding}
              refetch={get}
              back={item.back}
              isAdding={
                isAdding && user?.role === roles.TUTOR ? item.adding : false
              }
            />
          ))}
          <button
            style={{ minHeight: "150px" }}
            onClick={() => {
              setFlashcardData([
                ...flashcardData,
                {
                  id: generateUUID(),
                  front: "",
                  rear: "",
                  adding: true,
                  published: flashcardData[0].published,
                  sessions: flashcardData[0].sessions,
                },
              ]);
              setIsAdding(true);
            }}
            className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[50px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-accent w-full"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r4:"
            data-state="closed"
          >
            <PlusIcon />
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
              Add New Flashcard
            </p>
          </button>
        </div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {flashcardData.map((item) => (
              <CarouselItem key={item.id}>
                <RotateCards
                  refetch={get}
                  session_id={sessionid}
                  isAdding={
                    isAdding && user?.role === roles.TUTOR ? item.adding : false
                  }
                  setIsAdding={setIsAdding}
                  item={item}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {!fc_id ? (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : (
            <div className="flex justify-center mt-6 w-full">
              <Button
                onClick={() =>
                  router.push(`/dashboard/${sessionid}/flashcards`)
                }
              >
                View All Flashcards Of This Session
              </Button>
            </div>
          )}
        </Carousel>
      )}
    </>
  );
};

export default Flashcards;

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { CheckCheckIcon, Delete, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  addFlashcard,
  deleteFlashcard,
  publishFlashcards,
  updateFlashcard,
} from "../server-actions";
import { useAuth } from "@/context/AuthProvider";
import { roles } from "@/config/contants";
import { Heading } from "@/components/ui/heading";

const RotateCards = ({
  item,
  isAdding,
  refetch,
  setIsAdding,
  session_id,
}: {
  item: any;
  isAdding: boolean;
  refetch: () => Promise<void>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  session_id: string;
}) => {
  const [isAnswer, setAnswer] = React.useState(false);
  const [front, setFront] = React.useState(item.front);
  const [back, setBack] = React.useState(item.back);
  const [isEditing, setIsEditing] = React.useState(isAdding);
  const { toast } = useToast();
  const { user } = useAuth();

  const publishFlashcardFunc = async () => {
    try {
      const data = await publishFlashcards(item.id ?? "");
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
  return (
    <div
      key={item.id}
      className={cn("relative flipper", isAnswer && "rotatey")}
    >
      <Card
        key={item.id}
        id="front-card"
        className="bg-primary-foreground flex flex-col justify-between h-80"
      >
        <CardContent className="w-full h-full overflow-auto">
          <div
            onClick={() => setAnswer(true)}
            className=" overflow-auto cursor-pointer w-full flex justify-center px-6 items-center h-full"
          >
            <Heading level={1} className="font-semibold text-center">
              {front}
            </Heading>
          </div>
        </CardContent>
      </Card>
      <Card
        key={item.id}
        id="back-card"
        className="bg-primary-foreground  flex flex-col justify-between h-80"
      >
        <CardContent className="w-full h-full overflow-auto">
          <div
            onClick={() => setAnswer(false)}
            className=" overflow-auto cursor-pointer w-full flex justify-center px-6 items-center h-full"
          >
            <div>
              <Heading level={3} className="text-center font-semibold">
                {front}
              </Heading>
              <Heading level={3} className="text-center mt-8  font-normal">
                {back}
              </Heading>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RotateCards;

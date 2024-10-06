import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn, generateUUID } from "@/lib/utils";
import { Check, Edit, Trash2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  addFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from "../server-actions";
import React from "react";
import { Button } from "@/components/ui/button";

const EditableCard = ({
  id,
  front,
  session_id,
  index,
  back,
  setIsAdding,
  published,
  refetch,
  isAdding,
}: {
  front: string;
  id: string;
  published: boolean;
  back: string;
  index: number;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  session_id: string;
  isAdding: boolean;
  refetch: () => Promise<void>;
}) => {
  const [frontState, setFront] = React.useState(front);
  const [backState, setBack] = React.useState(back);
  const [isEditing, setIsEditing] = React.useState(isAdding);
  const { toast } = useToast();

  const updateFlashcardFunc = async () => {
    try {
      if (!frontState || !backState) {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Front and Back of flashcards cannot be empty",
        });
        return;
      }
      const data = await updateFlashcard(
        { front: frontState, rear: backState },
        id
      );
      if (data.success) {
        toast({
          variant: "default",
          title: "Flashcard updated successfully",
          description: `Flashcard updated successfully`,
        });
        setIsEditing(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error updating flashcard",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error updating flashcard",
      });
      console.error(error);
    }
  };

  const addFlashcardFunc = async () => {
    if (!frontState || !backState) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Front and Back of flashcards cannot be empty",
      });
      return;
    }
    try {
      const data = await addFlashcard({
        id: id,
        published: published,
        front: frontState,
        rear: backState,
        sessions: session_id,
      });
      if (data.success) {
        toast({
          variant: "default",
          title: "Flashcard added successfully",
          description: `Flashcard added successfully`,
        });
        setIsAdding(false);
        setIsEditing(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error adding flashcard",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error adding flashcard",
        duration: 5000,
      });
    }
  };

  const deleteFlashcardFunc = async (id: string) => {
    console.log(id, 116);
    try {
      const data = await deleteFlashcard(id);
      if (data.success) {
        await refetch();
        toast({
          variant: "default",
          title: "Flashcard deleted successfully",
          description: `Flashcard deleted successfully`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error deleting flashcard",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error deleting flashcard",
        duration: 5000,
      });
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h4>Flashcard - {index + 1}</h4>
          <div className="bg-white cursor-pointer rounded-full">
            {!isEditing ? (
              <Button
                variant={"outline"}
                onClick={() => setIsEditing(true)}
                className="text-primary"
              >
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <div
                  onClick={isAdding ? addFlashcardFunc : updateFlashcardFunc}
                  className="cursor-pointer"
                >
                  <Check color="green" />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (!front || !back) {
                      toast({
                        variant: "destructive",
                        title: "Error !!!",
                        description:
                          "Front and Back of flashcards cannot be empty",
                      });
                      return;
                    }
                    setIsEditing(false);
                  }}
                >
                  <X color="red" />
                </div>
                <div
                  onClick={() => deleteFlashcardFunc(id)}
                  className="cursor-pointer"
                >
                  <Trash2 color="red" />
                </div>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 px-8">
        <div className={cn("border p-4  w-1/2", isEditing && "border-none")}>
          {!isEditing ? (
            <p>{frontState}</p>
          ) : (
            <Textarea
              placeholder="Enter your question"
              value={frontState}
              rows={5}
              onChange={(e) => setFront(e.target.value)}
            />
          )}
        </div>
        <div className={cn("border p-4  w-1/2", isEditing && "border-none")}>
          {!isEditing ? (
            <p>{backState}</p>
          ) : (
            <Textarea
              className="h-full"
              placeholder="Enter your answer"
              value={backState}
              rows={5}
              onChange={(e) => setBack(e.target.value)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableCard;

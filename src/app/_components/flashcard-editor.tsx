import React from "react";
import { FlashcardData, QuizData } from "@/lib/types/global.types";
import { Button } from "@/components/ui/button";
import { TagsInput } from "react-tag-input-component";
import { updateQuiz } from "../admin/quizes/server-actions";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";
import { updateFlashcard } from "../admin/flashcards/server-actions";

const FlashCardEditor = ({
  flashcardId,
  flashcardData,
  setFlashcardData,
}: {
  flashcardId: string;
  flashcardData: FlashcardData[];
  setFlashcardData: React.Dispatch<React.SetStateAction<FlashcardData[]>>;
}) => {
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let newFlashcardData: FlashcardData[] = flashcardData.map((flashcard) => ({
      ...flashcard,
    }));

    formData.forEach((value, key) => {
      const index = Number(key.split("-")[1]);
      if (key.startsWith("front")) {
        newFlashcardData[index].front = value.toString();
      } else if (key.startsWith("back")) {
        newFlashcardData[index].back = value.toString();
      }
    });

    const resp = await updateFlashcard(newFlashcardData, flashcardId);
    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Flashcard updated successfully`,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Edit Flashcard</h2>
      <div className="flex flex-col gap-6 bg-white max-h-[450px] overflow-auto rounded-lg w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-12"
        >
          {flashcardData.map((item, index: number) => (
            <>
              <div
                className="border-2 border-r-0 border-b-0 border-l-0 p-6 flex flex-col gap-2"
                key={item.front}
              >
                <h3 className="text-center text-xl font-semibold">
                  Card {index + 1}
                </h3>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor={`front-${index}`}
                    className="text-sm font-semibold"
                  >
                    Front of the card
                  </label>
                  <input
                    id={`front-${index}`}
                    className="border-2 rounded-lg p-2"
                    type="text"
                    name={`front-${index}`}
                    placeholder="Enter front"
                    defaultValue={item.front}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-sm mt-2 font-semibold">
                    Back of the card
                  </label>
                  <input
                    id={`back-${index}`}
                    className="border-2 rounded-lg p-2"
                    type="text"
                    name={`back-${index}`}
                    placeholder="Enter back"
                    defaultValue={item.back}
                  />
                </div>
              </div>
            </>
          ))}
          <Button type="submit" className="w-1/2 mx-auto">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FlashCardEditor;

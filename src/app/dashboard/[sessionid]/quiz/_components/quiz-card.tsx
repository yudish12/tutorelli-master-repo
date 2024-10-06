import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import QuizOptionBox from "./quiz-option-box";
import { cn } from "@/lib/utils";
import { CheckCheckIcon, Delete, EditIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../server-actions/quizAndFlashcards";
import { useAuth } from "@/context/AuthProvider";
import { roles } from "@/config/contants";
import { Button } from "@/components/ui/button";

const QuizCard = ({
  question,
  options,
  explanation,
  isLast,
  refetch,
  quiz_id,
  adding,
  correctOption,
  setIsAdding,
  id,
}: {
  question: string;
  options: string[];
  explanation: string;
  adding: boolean;
  quiz_id: string;
  refetch: () => Promise<void>;
  isLast: boolean;
  correctOption: string;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
  const [isEditing, setIsEditing] = useState(adding);
  const [questionState, setQuestion] = useState(question);
  const [optionsState, setOptions] = useState(options);
  const [explanationState, setExplanation] = useState(explanation);
  const [correctOptionState, setCorrectOption] = useState(correctOption);
  const { toast } = useToast();
  const { user } = useAuth();

  const updateQuestionFunc = async () => {
    try {
      console.log(
        {
          question: questionState,
          options: optionsState,
          explanation: explanationState,
          correct_answer: correctOptionState,
        },
        id
      );
      const data = await updateQuestion(
        {
          question: questionState,
          options: optionsState,
          explanation: explanationState,
          correct_answer: correctOptionState,
        },
        id
      );
      if (data.success) {
        setIsEditing(false);
        toast({
          variant: "default",
          title: "Question updated successfully",
          description: `Question updated successfully`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error updating question",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error updating question",
      });
    }
  };

  const addQuestionFunc = async () => {
    try {
      const data = await addQuestion(
        {
          question: questionState,
          options: optionsState,
          explanation: explanationState,
          correct_answer: correctOptionState,
        },
        id,
        quiz_id
      );
      if (data.success) {
        await refetch();
        toast({
          variant: "default",
          title: "Question added successfully",
          description: `Question added successfully`,
        });

        setIsEditing(false);
        setIsAdding(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error adding question",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error adding question",
        duration: 5000,
      });
    }
  };

  const deleteQuestionFunc = async (id: string) => {
    try {
      const data = await deleteQuestion(id);
      if (data.success) {
        await refetch();
        toast({
          variant: "default",
          title: "Question deleted successfully",
          description: `Question deleted successfully`,
        });

        setIsEditing(false);
        setIsAdding(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error deleting question",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error deleting question",
        duration: 5000,
      });
    }
  };

  return (
    <Card
      className={cn(
        "w-full rounded-t-none border-[1.5px] border-t-0 border-gray-300 h-full p-6",
        !isLast && "rounded-b-none"
      )}
    >
      <CardHeader className="gap-2">
        <CardTitle className="capitalize flex items-center justify-between">
          Question
          {isEditing && user?.role === roles.TUTOR ? (
            <div className="flex gap-3 items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  const opt = optionsState.find(
                    (item) => item === correctOptionState
                  );
                  if (!opt) {
                    toast({
                      variant: "destructive",
                      title: "Error !!!",
                      description:
                        "Correct Option is not matched with existing options",
                    });
                    return;
                  }
                  if (!questionState) {
                    toast({
                      variant: "destructive",
                      title: "Error !!!",
                      description: "Question is required",
                    });
                  }
                  console.log(adding, isEditing);
                  if (adding) {
                    addQuestionFunc();
                    return;
                  } else {
                    updateQuestionFunc();
                  }
                }}
              >
                <CheckCheckIcon color="green" />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  const opt = optionsState.find(
                    (item) => item === correctOptionState
                  );
                  if (!opt) {
                    toast({
                      variant: "destructive",
                      title: "Error !!!",
                      description:
                        "Correct Option is not matched with existing options",
                    });
                    return;
                  }
                  if (!questionState) {
                    toast({
                      variant: "destructive",
                      title: "Error !!!",
                      description: "Question is required",
                    });
                    return;
                  }
                  setIsEditing(false);
                }}
              >
                <Delete color="red" />
              </div>
            </div>
          ) : (
            <>
              {user?.role === roles.TUTOR && (
                <div className="flex gap-4 items-center">
                  {/* <div
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    className="cursor-pointer"
                  >
                    
                  </div> */}
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    className="bg-green-600"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteQuestionFunc(id)}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </>
          )}
        </CardTitle>
        {!isEditing ? (
          <p className="text-darkgray mt-2">{questionState}</p>
        ) : (
          <Input
            type="text"
            placeholder="Enter question mt-4"
            value={questionState}
            onChange={(e) => setQuestion(e.target.value)}
          />
        )}
      </CardHeader>
      <CardContent className="flex">
        <QuizOptionBox
          correctOption={correctOptionState}
          isEditing={isEditing}
          setCorrectOption={setCorrectOption}
          setOptions={setOptions}
          options={optionsState}
        />
      </CardContent>
    </Card>
  );
};

export default QuizCard;

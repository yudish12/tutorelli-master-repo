"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { roles } from "@/config/contants";
import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { publishQuiz } from "../server-actions/quizAndFlashcards";

const QuizPublishBtn = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const publishQuizFunc = async () => {
    try {
      const data = await publishQuiz(id);
      if (data.success) {
        toast({
          variant: "default",
          title: "Quiz published successfully",
          description: `Quiz published successfully`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error !!!",
          description: "Error publishing quiz",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !!!",
        description: "Error publishing quiz",
      });
    }
  };
  if (!user || !user || user.role !== roles.TUTOR) return <></>;
  return <Button onClick={publishQuizFunc}>Publish Quiz</Button>;
};

export default QuizPublishBtn;

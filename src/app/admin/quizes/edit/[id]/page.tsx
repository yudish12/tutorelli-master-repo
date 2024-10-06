"use client";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { getQuizById } from "../../server-actions";
import QuizEditor from "@/app/_components/quiz-editor";
import { QuizData } from "@/lib/types/global.types";

const QuizEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(true);
  const [quizData, setQuizData] = React.useState<QuizData[]>([]);
  const [quizName, setQuizName] = React.useState("");

  const getQuizDetails = useCallback(async () => {
    const data = await getQuizById(id);
    setQuizData(data[0].quiz_data);
    setQuizName(data[0].quiz_name);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getQuizDetails();
  }, []);

  return (
    <QuizEditor
      quizId={id}
      quizData={quizData}
      quizname={quizName}
      setQuizData={setQuizData}
      setQuizname={setQuizName}
    />
  );
};

export default QuizEditPage;

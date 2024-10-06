"use client";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import FlashCardEditor from "@/app/_components/flashcard-editor";
import { FlashcardData } from "@/lib/types/global.types";
import { getFlashcardById } from "../../server-actions";

const QuizEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState(true);
  const [flashcardData, setFlashcardData] = React.useState<FlashcardData[]>([]);

  const getFlashcardAsync = useCallback(async () => {
    const data = await getFlashcardById(id);
    setFlashcardData(data[0].content);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getFlashcardAsync();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <FlashCardEditor
      flashcardData={flashcardData}
      flashcardId={id}
      setFlashcardData={setFlashcardData}
    />
  );
};

export default QuizEditPage;

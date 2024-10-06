import React from "react";
import QuizHeader from "./_components/quiz-header";
import QuizCard from "./_components/quiz-card";
import QuizPublishBtn from "./_components/quiz-publish";
import { Heading } from "@/components/ui/heading";
import { roles } from "@/config/contants";
import { useAuth } from "@/context/AuthProvider";
import { PlusIcon } from "lucide-react";

const QuizPage = ({
  quizData,
  isPublished,
  refetch,
  quizid,
  addQuestion,
  setIsAdding,
  isAdding,
}: {
  quizData: any;
  isPublished: boolean;
  refetch: () => Promise<void>;
  quizid: string;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  addQuestion: () => void;
}) => {
  const { user } = useAuth();
  console.log(quizData);
  return (
    <div className="p-4">
      <div className="flex justify-between bg-white p-3 rounded-lg">
        <Heading level={4}>Quiz Page</Heading>
        {!isPublished && <QuizPublishBtn id={quizid} />}
      </div>
      <QuizHeader score={10} totalScore={20} />
      {quizData.map((item: any, index: number) => (
        <QuizCard
          quiz_id={quizid}
          refetch={refetch}
          setIsAdding={setIsAdding}
          key={item.id}
          question={item.questions}
          id={item.id}
          explanation={item.explanation}
          correctOption={item.answer}
          options={item.options}
          isLast={index === quizData.length - 1}
          adding={isAdding ? item.adding : false}
        />
      ))}
      {user?.role === roles.TUTOR && !isAdding && (
        <button
          style={{ minHeight: "150px" }}
          onClick={addQuestion}
          className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[80px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 mt-6 bg-white w-full"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r4:"
          data-state="closed"
        >
          <PlusIcon />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Add New Question
          </p>
        </button>
      )}
    </div>
  );
};

export default QuizPage;

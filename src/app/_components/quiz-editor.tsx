import { QuizData } from "@/lib/types/global.types";
import React from "react";
import { Button } from "@/components/ui/button";
import { TagsInput } from "react-tag-input-component";
import { updateQuiz } from "../admin/quizes/server-actions";
import { useToast } from "@/components/ui/use-toast";

const QuizEditor = ({
  quizId,
  quizname,
  quizData,
  setQuizData,
  setQuizname,
}: {
  quizId: string;
  quizname: string;
  quizData: QuizData[];
  setQuizData: React.Dispatch<React.SetStateAction<QuizData[]>>;
  setQuizname: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { toast } = useToast();
  const handleOptionsChange = (index: number, options: string[]) => {
    setQuizData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, options } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let newQuizData: QuizData[] = [];
    formData.forEach((value, key) => {
      console.log(key, value);
      if (key.startsWith("question")) {
        newQuizData.push({
          question: value.toString(),
          options: [],
          explanation: "",
          correct_answer: "",
        });
      } else if (key.startsWith("options")) {
        const index = Number(key.split("-")[1]);
        newQuizData[newQuizData.length - 1].options = quizData[index].options;
      } else if (key.startsWith("correct-answer")) {
        newQuizData[newQuizData.length - 1].correct_answer = value.toString();
      } else if (key.startsWith("explanation")) {
        newQuizData[newQuizData.length - 1].explanation = value.toString();
      }
    });
    const resp = await updateQuiz(newQuizData, quizname, quizId);
    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Quiz updated successfully`,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Edit Quiz</h2>
      <div className="flex flex-col gap-6 bg-white max-h-[450px] overflow-auto rounded-lg w-1/2 mx-auto">
        <div className="flex flex-col gap-4 p-6">
          <label htmlFor="quiz-name" className="text-sm font-semibold">
            Quiz Name
          </label>
          <input
            id="quiz-name"
            className="border-2 rounded-lg p-2"
            type="text"
            onChange={(e) => setQuizname(e.target.value)}
            placeholder="Enter quiz name"
            value={quizname}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-12"
        >
          {quizData.map((item, index: number) => (
            <div
              className="border-2 border-r-0 border-b-0 border-l-0 p-6 flex flex-col gap-2"
              key={item.question}
            >
              <div className="flex flex-col gap-4">
                <label
                  htmlFor={`question-${index}`}
                  className="text-sm font-semibold"
                >
                  Question
                </label>
                <input
                  id={`question-${index}`}
                  className="border-2 rounded-lg p-2"
                  type="text"
                  name={`question-${index}`}
                  placeholder="Enter question"
                  defaultValue={item.question}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-sm mt-2 font-semibold">Options</label>
                <TagsInput
                  value={item.options}
                  onChange={(options: string[]) =>
                    handleOptionsChange(index, options)
                  }
                  classNames={{
                    tag: "bg-[#FFF0E3]",
                    input: "placeholder:text-[12px] border-2",
                  }}
                  name={`options-${index}`}
                  placeHolder="Add Options Here..."
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-sm mt-2 font-semibold">
                  Correct Option
                </label>
                <input
                  id={`correct-answer-${index}`}
                  defaultValue={item.correct_answer}
                  name={`correct-answer-${index}`}
                  className="border-2 rounded-lg p-2"
                  type="text"
                  placeholder="Enter correct answer"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="explanation"
                  className="text-sm mt-2 font-semibold"
                >
                  Explanation
                </label>
                <textarea
                  name="explanation"
                  defaultValue={item.explanation}
                  id="explanation"
                ></textarea>
              </div>
            </div>
          ))}
          <Button type="submit" className="w-1/2 mx-auto">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizEditor;

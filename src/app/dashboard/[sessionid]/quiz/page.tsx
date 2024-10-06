"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect } from "react";
import {
  getQuizBySessionId,
  getQuizBySessionIdEdit,
} from "./server-actions/quizAndFlashcards";
import QuizPage from "./Quiz";
import { useParams, useSearchParams } from "next/navigation";
import { roles } from "@/config/contants";
import { generateUUID } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Quizes = () => {
  const { user_info, user, isAdmin } = useAuth();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz_id");
  const { sessionid } = useParams<{ sessionid: string }>();
  const [loading, setLoading] = React.useState(true);
  const [quizData, setQuizData] = React.useState<any[]>([]);
  const [activeQuiz, setActiveQuiz] = React.useState<string>(quizId ?? "");
  const [isAdding, setIsAdding] = React.useState(false);

  const addQuestion = async () => {
    setIsAdding(true);
    const newQuestion = {
      id: generateUUID(),
      questions: "",
      options: ["random1", "random2", "random3", "random4"],
      explanation: "",
      correct_answer: "random",
      adding: true,
    };
    setQuizData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[0].questions.push(newQuestion);
      return temp;
    });
  };

  const get = async () => {
    setLoading(true);
    let data;
    if (user?.role !== roles.TUTOR) {
      data = await getQuizBySessionId(sessionid);
    } else {
      data = await getQuizBySessionIdEdit(sessionid);
    }
    console.log(data);
    setQuizData(data);
    setActiveQuiz(data[0]?.id);
    setLoading(false);
  };

  useEffect(() => {
    console.log(user_info, isAdmin, activeQuiz);
    if (!user_info && !isAdmin) return;
    get();
  }, [user_info]);

  if (loading)
    return (
      <div className="p-4 flex flex-col gap-4">
        <Skeleton className="h-[80px] w-full rounded-xl" />
        {...Array.from({ length: 3 }, (_, i) => (
          //@ts-ignore
          <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
        ))}
      </div>
    );

  if (!activeQuiz)
    return (
      <>
        <h2 className="text-3xl font-semibold mb-6">Your Quizes</h2>

        <div className="grid gap-x-2 gap-y-3 lg:grid-cols-4 grid-cols-3 overflow-auto">
          {quizData.map((item) => (
            <Card key={item.id} className="bg-primary-foreground ">
              <CardHeader className="text-2xl capitalize font-semibold">
                {item.quiz_name}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">Subject:{item.subject}</div>
                <div>Class:{item.class}</div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveQuiz(item.quiz_id)}>
                  Take Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );

  return (
    <>
      <QuizPage
        isAdding={isAdding}
        refetch={get}
        setIsAdding={setIsAdding}
        addQuestion={addQuestion}
        quizData={quizData.find((item) => item.id === activeQuiz)?.questions}
        isPublished={quizData.find((item) => item.id === activeQuiz)?.published}
        quizid={quizData.find((item) => item.id === activeQuiz).id}
      />
    </>
  );
};

export default Quizes;

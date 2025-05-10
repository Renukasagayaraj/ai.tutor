import { useCallback, useEffect, useState } from "react";
import ChatInput from "./chatpanel";
import { useMutation } from "@tanstack/react-query";

import { createChat, createSession } from "@/api/query";
import LoadingSkeleton from "./loadingskeleton";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/hooks/store";
import { useToast } from "./ui/use-toast";
export default function HeroSection() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const { error, setError } = useChatStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (sessionId: string) => {
      await createChat(question, sessionId);
    },
  });

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const sessionId = await createSession();
      return await mutateAsync(sessionId)
        .then(() => {
          setLoading(false);
          setQuestion("");
          navigate("/chat/" + sessionId);
        })
        .catch((error) => {
          console.error("Mutation failed", error);
          setError(true);
        });
    },
    [mutateAsync] // Dependencies
  );

  useEffect(() => {
    //use a time function to dismiss the toast in 5 seconds if there is an error
    if (error) {
      useToast().toast({
        title: "Ooops!",
        description: "Something went wrong. Please try again.",
      });
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  if (isPending || loading) {
    return <LoadingSkeleton title={question} />;
  }
  return (
    <main className="items-center flex flex-col mt-40 px-2 md:px-20 gap-4">
      <h1 className="text-3xl font-bold">Discover Supplements Smartly!</h1>
      <ChatInput
        handleSubmit={handleSubmit}
        setQuestion={setQuestion}
        question={question}
      />
    </main>
  );
}

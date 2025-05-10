import { useChatStore } from "../hooks/store";
import LoadingSkeleton from "../components/loadingskeleton";
import { ProductList } from "../components/productsList";
import ChatInput from "../components/chatpanel";
import { Button } from "../components/ui/button";
import { useCallback, useEffect } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { createChat } from "@/api/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { chatId } = params;
  if (typeof chatId === "undefined") {
    throw new Response("Not Found", { status: 404 });
  }
  return { chatId };
};

function Chat() {
  const { chatId } = useLoaderData() as { chatId: string };

  const { loading, setLoading, question, setQuestion, error, setError } =
    useChatStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onClick = () => {
    navigate("/");
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (sessionId: string) => {
      await createChat(question, sessionId);
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      return await mutateAsync(chatId)
        .then(() => {
          setLoading(false);
          setQuestion("");
          queryClient.invalidateQueries({ queryKey: ["chat"] });
        })
        .catch((error) => {
          console.error("Mutation failed", error);
        });
    },
    [mutateAsync] // Dependencies
  );

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    }
    if (error) {
      useToast().toast({
        title: "Ooops!",
        description: "Something went wrong. Please try again.",
      });
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [isPending, error]);

  return (
    <div className="px-2 md:px-10 py-10 w-full">
      <ProductList />
      {loading && <LoadingSkeleton title={question} />}
      <div className="py-10 flex items-center space-x-2 w-full">
        <ChatInput
          handleSubmit={handleSubmit}
          setQuestion={setQuestion}
          question={question}
        />
        <Button onClick={onClick}> New Chat + </Button>
      </div>
    </div>
  );
}

export default Chat;

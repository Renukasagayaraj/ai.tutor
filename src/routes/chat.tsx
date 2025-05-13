import { useChatStore } from "../hooks/store";
import LoadingSkeleton from "../components/loadingskeleton";
import { ProductList } from "../components/productsList";
import ChatInput from "../components/chatpanel";
import { Button } from "../components/ui/button";
import { useCallback, useEffect, useState } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { createChat, mockApi } from "@/api/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import ChatUI from "@/components/ChatUI";

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
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" }
  ]);

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

  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     return await mutateAsync(chatId)
  //       .then(() => {
  //         setLoading(false);
  //         setQuestion("");
  //         setShowProducts(true); // <-- Show products after submit
  //         queryClient.invalidateQueries({ queryKey: ["chat"] });
  //       })
  //       .catch((error) => {
  //         console.error("Mutation failed", error);
  //       });
  //   },
  //   [mutateAsync] // Dependencies
  // );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const userText = question.trim();
      if (!userText) return;
  
      // Add user message
      setMessages((msgs) => [...msgs, { sender: "user", text: userText }]);
      setLoading(true);
      setQuestion("");
  
      try {
        const responseArr = await mockApi();
        // Use the description of the first product as the AI's response
        const aiMsg = responseArr[0]?.products?.[0]?.description || "Sorry, I didn't get that.";
               
        setMessages((msgs) => [...msgs, { sender: "ai", text: aiMsg }]);
      } catch (err) {
        setMessages((msgs) => [
          ...msgs,
          { sender: "ai", text: "Sorry, there was an error." }
        ]);
      } finally {
        setLoading(false);
      }
    },
    [question]
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
    <div className="px-2 md:px-10 py-10 ">
      {/* <ProductList}/> */}
      <ChatUI messages={messages} loading={loading} />
      {loading && <LoadingSkeleton title={question} />}
      <div className="py-10 flex items-center space-x-2 w-full">
        <ChatInput
          handleSubmit={handleSubmit}
          setQuestion={setQuestion}
          question={question}
        />
        {/* <Button onClick={onClick}> New Chat + </Button> */}
      </div>
    </div>
  );
}

export default Chat;

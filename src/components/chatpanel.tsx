import { SendHorizonal } from "lucide-react";
import { useRef } from "react";
import useAutosizeTextArea from "@/hooks/autoresize";

export default function ChatInput({
  handleSubmit,
  setQuestion,
  question,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setQuestion: (questin: string) => void;
  question: string;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  useAutosizeTextArea(textAreaRef.current, question);

  return (
    <form className="w-full " onSubmit={handleSubmit}>
      <div className="relative w-full  ">
        <textarea
          name="question"
          id="question"
          className=" bg-white rounded-md w-full p-3 focus:outline-none resize-none border-1 ring-2 ring-gray-400 focus:ring-gray-600 dark:ring-0 dark:focus:ring-2  dark:focus:ring-gray-100 text-black"
          placeholder="Ask your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitRef.current?.click();
            }
          }}
          rows={1}
          ref={textAreaRef}
          required
        ></textarea>
        <button
          ref={submitRef}
          className="absolute right-3 top-2 hover:bg-gray-300 dark:hover:bg-gray-500 p-2 rounded-lg"
          type="submit"
          aria-label="Submit"
        >
          <SendHorizonal className="size-5 text-black" /> {/* <-- Add text-black here */}
        </button>
      </div>
    </form>
  );
}

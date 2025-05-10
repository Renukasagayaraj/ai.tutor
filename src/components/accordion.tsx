import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ResponseData } from "./producttype";
import ProductAnswerPanel from "./product-panel";

export default function Accordion({
  response,
  open,
}: {
  response: ResponseData;
  open?: boolean;
}) {
  const [accordion, setAccordion] = useState<boolean>(open || false);
  return (
    <div className="p-4 rounded-md  w-full  d   ">
      <button
        className="flex justify-between w-full font-semibold"
        onClick={() => setAccordion(!accordion)}
      >
        <span>{response.question}</span>
        <span className="ml-auto rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-900">
          {accordion ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      <div
        className={`grid transition-all overflow-hidden duration-300 ease-in-out text-sm ${
          accordion
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="py-4">
            {response.noanswer ? (
              <p className="text-muted-foreground">{response.noanswer}</p>
            ) : (
              <ProductAnswerPanel
                message={response.message}
                products={response.products}
                summary={response.summary}
                noanswer=""
                question={response.question}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

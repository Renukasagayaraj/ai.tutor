import Accordion from "./accordion";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { sessionHistory } from "@/api/query";

export function ProductList() {
  const { chatId } = useParams();

  const { data: queryData, isPending } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      return await sessionHistory(chatId!);
    },
  });

  if (isPending) {
    return <div className="min-w-full px-2">Loading</div>;
  }
  if (!queryData) {
    return (
      <div className="h-dvh md:h-lvh flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Oops!</h1>
        <p className="text-base">Sorry, an could not find the your page</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {queryData?.map((response: any, index: any) => (
        <Accordion
          key={index}
          response={response}
          open={index === queryData.length - 1}
        />
      ))}
    </div>
  );
}

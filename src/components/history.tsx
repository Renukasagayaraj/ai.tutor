import {
  ChevronRight,
  ChevronsRight,
  History,
  LoaderCircle,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clear_history, get_user_history } from "@/api/query";

import moment from "moment";

import { useToast } from "./ui/use-toast";
export default function HistoryPanel() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      return await get_user_history();
    },
  });
  const { mutateAsync, isPending: isPendingClear } = useMutation({
    mutationFn: async () => {
      return await clear_history();
    },
  });

  const handleClearHistory = async () => {
    return await mutateAsync()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["history"] });
        navigate("/");
      })
      .catch((error) => {
        console.error("Mutation failed", error);
        useToast().toast({
          title: "Ooops!",
          description: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="absolute top-20 left-4">
          <ChevronRight />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>History</span>
            <History className="w-5 h-5" />
          </SheetTitle>
          <SheetDescription>View your history.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid  items-center gap-4">
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <>
                {data?.length > 0 ? (
                  Array.isArray(data)? data?.map((item: any) => (
                    <div
                      key={item?.sessionId}
                      className="flex items-center w-full gap-4"
                    >
                      <div>
                        <ChevronsRight className="w-5 h-5 stroke-lime-700 dark:stroke-lime-500" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">
                          {moment(item?.createdAt).fromNow()}
                        </span>
                        <SheetClose asChild>
                          <Link to={`/chat/${item?.sessionId}`}>
                            <p className="text-accent-foreground line-clamp text-medium hover:underline hover:decoration-dotted underline-offset-8">
                              {item?.input}
                            </p>
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  )): null
                ) : (
                  <p>No history found.</p>
                )}
              </>
            )}
          </div>
        </div>
        <SheetFooter className="absolute bottom-5 flex flex-col justify-center w-[90%]">
          {data?.length > 0 && (
            <Button
              className="w-full inline-flex gap-3 items-center"
              type="button"
              variant="destructive"
              disabled={isPendingClear}
              onClick={handleClearHistory}
            >
              <span>Clear History </span>
              {isPendingClear ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Trash className="w-4 h-4" />
              )}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

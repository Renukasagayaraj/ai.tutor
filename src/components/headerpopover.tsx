import { get_user } from "@/api/query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/hooks/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function HeaderPopover() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await get_user();
    },
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!data)
    return (
      <Avatar>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Avatar>
    );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Avatar>
            <Avatar>
              <AvatarImage src={data?.user?.avatar} alt={data?.name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] space-y-3">
        <p className="text-foreground font-medium">{data?.user?.name}</p>
        <div className="w-full flex justify-center">
          <Button
            className="w-full text-center"
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

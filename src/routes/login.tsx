import { login_user } from "@/api/query";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { setAuth, auth } = useAuthStore();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      return await login_user(data?.email, data?.name, data?.picture);
    },
    onSuccess: (data: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user", "history"] });
      setAuth({
        email: data?.email,
        isAthenticated: true,
      });
      setIsSubmitting(false);
      navigate("/");
    },
  });

  const handleSubmit = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsSubmitting(true);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",

          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        await mutateAsync(res.data);
      } catch (error) {
        console.error("Mutation failed", error);
      }
    },
  });

  useEffect(() => {
    if (auth.isAthenticated) {
      navigate("/");
    }
  }, [auth.isAthenticated]);
  return (
    <div className="mt-36 flex flex-col w-full justify-center items-center">
      <div className=" border border-gray-200 rounded-md shadow-md  dark:border dark:border-100 p-4 w-full max-w-md ">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold ">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Sign in to your account
          </p>
        </div>
        <div className="p-10">
          <Button
            type="button"
            variant="default"
            className="w-full text-center"
            onClick={() => handleSubmit()}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                please wait!
              </div>
            ) : (
              <div className="flex space-x-3 items-center w-full justify-center font-medium leading-relaxed">
                <span>SignIn With Google</span> <GoogleLogoSvg />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function GoogleLogoSvg() {
  return (
    <svg
      className="fill-white dark:fill-slate-900 h-6 "
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ionicons-v5_logos</title>
      <path d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z" />
    </svg>
  );
}

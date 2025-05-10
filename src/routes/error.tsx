import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="h-dvh md:h-lvh flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-base">Sorry, an unexpected error has occurred.</p>
      <p className="text-base">
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}

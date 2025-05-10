import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App, { loader as AppLoader } from "./App.tsx";
import Login from "./routes/login.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat, { loader as ChatLoader } from "./routes/chat.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: AppLoader,

    children: [
      {
        path: "/",
        element: <App />,
        index: true,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/chat/:chatId",
        element: <Chat />,
        loader: ChatLoader,
      },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

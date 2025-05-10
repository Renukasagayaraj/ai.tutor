import Header from "@/components/header";
import HistoryPanel from "@/components/history";
import { useAuthStore } from "@/hooks/auth";
import { Helmet } from "react-helmet";
export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    auth: { isAthenticated },
  } = useAuthStore();

  return (
    <div className="relative h-dvh md:h-lvh ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>HubbleShop</title>
      </Helmet>
      <Header />
      {isAthenticated && <HistoryPanel />}
      {children}
    </div>
  );
}

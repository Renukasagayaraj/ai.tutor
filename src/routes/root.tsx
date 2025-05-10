import Layout from "@/layout";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
export default function Root() {
  return (
    <Layout>
      <Toaster />
      <Outlet />
    </Layout>
  );
}

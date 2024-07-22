import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export function Layout() {
  const navigate = useNavigate();
  let user = sessionStorage.getItem("user");
  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);
  return (
    <>
      <Navbar />
      <main className="flex w-screen justify-center mt-24">
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}

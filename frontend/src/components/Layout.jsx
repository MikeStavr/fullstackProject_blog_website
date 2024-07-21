import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";

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
      </main>
    </>
  );
}

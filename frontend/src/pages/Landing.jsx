import { useState } from "react";
import { CreateUser } from "../components/CreateUser";
import { Login } from "../components/Login";
import { Button } from "@/components/ui/button";

export function Landing() {
  // if 0, login mode else create user mode
  const [view, setView] = useState(false);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {!view ? (
        <div className="flex flex-col w-96">
          {" "}
          <Login />
          <Button onClick={() => setView(!view)}>Create account</Button>
        </div>
      ) : (
        <div className="flex flex-col w-96">
          <CreateUser />
          <Button onClick={() => setView(!view)}>Switch to Login</Button>
        </div>
      )}
    </div>
  );
}

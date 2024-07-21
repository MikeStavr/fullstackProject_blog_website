import { useState } from "react";
import { verifyUser } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await verifyUser(user);
    if (response) {
      sessionStorage.setItem("user", response);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
      navigate("/home");
    } else {
      alert("Error logging in");
    }

    setUser({
      email: "",
      password: "",
    });
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        maxLength={50}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        maxLength={50}
        onChange={handleChange}
        required
        className="mb-2"
      />
      <Button type="submit" className="mb-4">
        Login
      </Button>
    </form>
  );
}

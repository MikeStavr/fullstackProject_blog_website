import { useState } from "react";
import { createUser } from "../api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await createUser(user);
    console.log(response);
    if (response.data.error === "email_taken") {
      alert("Error creating user");
      return;
    }
    setUser({
      name: "",
      email: "",
      password: "",
    });
    alert("User created successfully!");
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h1 className="text-primary mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Create a new user!
      </h1>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="name"
          value={user.name}
          placeholder="Name"
          onChange={handleChange}
          required
          maxLength={20}
          className="mb-2"
        />

        <Input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
          required
          maxLength={50}
          className="mb-2"
        />

        <Input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
          required
          maxLength={20}
          className="mb-2"
        />

        <Button type="submit" className="mb-2">
          Create account
        </Button>
      </form>
    </div>
  );
}

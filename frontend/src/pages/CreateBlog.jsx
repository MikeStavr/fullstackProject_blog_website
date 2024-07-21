import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let post = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };
    await createPost(post);
    setTitle("");
    setDescription("");
    setContent("");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-1/3">
      <Label className="flex left-0 p-2" htmlFor="title">
        Blog post title:
      </Label>
      <Input
        required
        name="title"
        type="text"
        maxLength={100}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <Label className="flex left-0 p-2" htmlFor="description">
        Blog description:
      </Label>
      <Input
        required
        name="description"
        type="text"
        maxLength={200}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <Label className="flex left-0 p-2" htmlFor="content">
        Blog content:
      </Label>
      <Textarea
        required
        name="content"
        maxLength={5000}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}

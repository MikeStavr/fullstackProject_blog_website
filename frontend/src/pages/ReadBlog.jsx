import { useEffect, useState } from "react";
import { getPost } from "../api";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

export function ReadBlog() {
  let params = useParams();
  let id = params.id;
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  let user = jwtDecode(sessionStorage.getItem("user"));

  useEffect(() => {
    async function loadPost() {
      const data = await getPost(id);
      setPost(data);
    }
    loadPost();
  }, []);

  let date = new Date(post.dateCreated);
  let stringDate = date.toDateString();

  return (
    <div className="flex flex-col w-1/3 items-center">
      <Button onClick={() => navigate(-1)} className="w-48 my-4">
        {" "}
        Go Back
      </Button>
      <h1 className="text-primary mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {post.title}
      </h1>
      <h2 className="mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {post.description}
      </h2>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {stringDate.slice(4, 15)}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        {post.content}
      </p>
      {console.log(post)}
      <i>By: {post.author == user._id ? user.name : post.author}</i>
    </div>
  );
}

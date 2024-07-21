import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { getPosts } from "../api";
import * as jwt_decode from "jwt-decode";
export function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("user");
      const decodedUser = jwt_decode.jwtDecode(token);
      const allPosts = await getPosts(decodedUser);
      const filteredPosts = allPosts.filter(
        (post) => post.author == decodedUser._id
      );
      setUser(decodedUser);
      setPosts(filteredPosts);
    }
    loadUserData();
  }, []);

  return (
    <div className="w-1/3">
      <label className="flex left-0 mb-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Name:{" "}
      </label>
      <h1 className="flex left-0">{user.name}</h1>
      <label className="flex left-0 mb-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Email:{" "}
      </label>
      <h1 className="flex left-0">{user.email}</h1>
      <label className="flex left-0 mb-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Join date:{" "}
      </label>
      <h1 className="flex left-0 mb-4">
        {new Date(user.joinDate).toString().slice(4, 15)}
      </h1>
      <hr />
      <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        All blogs found for user:{" "}
        <span className="text-primary underline">{user.name}</span>
      </h1>
      {posts.map((post) => {
        return <BlogCard key={post._id} post={post} />;
      })}
    </div>
  );
}

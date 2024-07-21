import { getPosts } from "../api";
import { useEffect, useState } from "react";

import { BlogCard } from "../components/BlogCard";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts(); // This should contain all the posts (as an array).
      data.sort(
        (d1, d2) => new Date(d2.dateCreated) - new Date(d1.dateCreated)
      );
      setPosts(data);
    }
    loadAllPosts();
  }, []);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-1/3 mt-4">
        {posts.map((post) => {
          return <BlogCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}

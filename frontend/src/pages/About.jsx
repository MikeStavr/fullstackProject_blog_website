import { Link } from "react-router-dom";
export function About() {
  return (
    <div className="w-1/3">
      <h1 className="text-primary mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        About
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">
        Welcome to our page! Here you will find a wide variety of blogs posts
        related to many different topics. Feel free to contribute using the{" "}
        <Link to="/createblog">Create Blog</Link> page. Thank you for visiting!
      </p>
    </div>
  );
}

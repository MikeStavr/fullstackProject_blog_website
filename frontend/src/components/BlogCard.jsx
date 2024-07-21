import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { deletePost } from "@/api";

import * as jwt_decode from "jwt-decode";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function BlogCard({ post }) {
  let date = new Date(post.dateCreated);
  let stringDate = date.toDateString();

  let user = jwt_decode.jwtDecode(sessionStorage.getItem("user"));

  async function handleDelete(post) {
    deletePost(post._id);
    window.location.reload();
  }

  return (
    <Card className="flex w-full justify-center my-8 hover:bg-muted">
      <Link to={`/readblog/${post._id}`} className="w-full">
        <CardHeader>
          <CardTitle>
            <h1 className="text-primary scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {post.title}
            </h1>
          </CardTitle>
          <CardDescription>
            <h2>{post.description}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3>{stringDate.slice(4, 15)}</h3>
        </CardContent>
      </Link>
      {/* View manage post buttons if the post is written by the logged in user. */}
      {post.author == user._id ? (
        <div className="flex flex-col">
          <h1>Manage post:</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="m-4 bg-red-500 hover:bg-red-500 cursor-pointer">
                Delete Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this post?
                </DialogTitle>
                <DialogDescription>
                  This action is{" "}
                  <span className="text-red-500">irreversible</span>.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="bg-red-500 hover:bg-red-500"
                    type="submit"
                    onClick={() => handleDelete(post)}
                  >
                    Yes
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">No</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <></>
      )}
    </Card>
  );
}

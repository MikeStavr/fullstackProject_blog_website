import { Link, useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import { useState } from "react";
import { updatePost } from "@/api";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deletePost } from "@/api";

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
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    description: post.description,
    content: post.content,
    author: post.author,
    dateCreated: post.dateCreated,
  });

  const { toast } = useToast();

  let date = new Date(post.dateCreated);
  let stringDate = date.toDateString();

  let user = jwt_decode.jwtDecode(sessionStorage.getItem("user"));

  async function handleDelete(post) {
    deletePost(post._id);
    window.location.reload();
  }

  function handleChangedPost(e) {
    setEditedPost({
      ...editedPost,
      [e.target.name]: e.target.value,
    });
  }

  async function handleEditPost(post) {
    if (
      editedPost.title == "" ||
      editedPost.description == "" ||
      editedPost.content == ""
    )
      return;

    if (
      editedPost.title == post.title &&
      editedPost.description == post.description &&
      editedPost.content == post.content
    ) {
      toast({
        title: "No changes made",
        description: "You have not made any changes.",
      });
      return;
    }
    let response = await updatePost(post._id, editedPost);
    console.log(response);
    if (response) {
      toast({
        title: "Post updated",
        description: "Your post has been updated.",
      });
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: "There was an error updating your post.",
      });
    }
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

          {/* Edit post button */}

          <Dialog className="min-h-full">
            <DialogTrigger asChild>
              <Button className="m-4 bg-yellow-500 hover:bg-yellow-500 cursor-pointer">
                Edit Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Editing post "<abbr title={post._id}>{post.title}"</abbr>
                </DialogTitle>
                <DialogDescription>Change the info below</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-5">
                <Input
                  placeholder="Post title"
                  value={editedPost.title}
                  name="title"
                  onChange={(e) => {
                    handleChangedPost(e);
                  }}
                ></Input>
                <Input
                  placeholder="Post description"
                  value={editedPost.description}
                  name="description"
                  onChange={(e) => {
                    handleChangedPost(e);
                  }}
                ></Input>
                <Textarea
                  placeholder="Post content"
                  className="h-48"
                  value={editedPost.content}
                  name="content"
                  onChange={(e) => {
                    handleChangedPost(e);
                  }}
                ></Textarea>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={() => handleEditPost(post)}>
                    Submit changes
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" className="bg-red-500 hover:bg-red-500">
                    No
                  </Button>
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

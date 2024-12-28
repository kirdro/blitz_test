"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deletePost from "../mutations/deletePost";
import getPost from "../queries/getPost";

export const Post = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const [deletePostMutation] = useMutation(deletePost);
  const [post] = useQuery(getPost, { id: postId });

  return (
    <>
      <div>
        <h1>Project {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>

        <Link href={`/posts/${post.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePostMutation({ id: post.id });
              router.push("/posts");
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

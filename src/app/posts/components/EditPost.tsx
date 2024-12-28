"use client";
import { Suspense } from "react";
import updatePost from "../mutations/updatePost";
import getPost from "../queries/getPost";
import { UpdatePostSchema } from "../schemas";
import { FORM_ERROR, PostForm } from "./PostForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditPost = ({ postId }: { postId: number }) => {
  const [post, { setQueryData }] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updatePostMutation] = useMutation(updatePost);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Post {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <PostForm
            submitText="Update Post"
            schema={UpdatePostSchema}
            initialValues={post}
            onSubmit={async (values) => {
              try {
                const updated = await updatePostMutation({
                  ...values,
                  id: post.id,
                });
                await setQueryData(updated);
                router.refresh();
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};

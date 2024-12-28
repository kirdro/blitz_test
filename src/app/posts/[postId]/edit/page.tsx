import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getPost from "../../queries/getPost";
import { EditPost } from "../../components/EditPost";

type EditPostPageProps = {
  params: { postId: string };
};

export async function generateMetadata({
  params,
}: EditPostPageProps): Promise<Metadata> {
  const Post = await invoke(getPost, { id: Number(params.postId) });
  return {
    title: `Edit Post ${Post.id} - ${Post.name}`,
  };
}

export default async function Page({ params }: EditPostPageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost postId={Number(params.postId)} />
      </Suspense>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getPost from "../queries/getPost";
import { Post } from "../components/Post";

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const Post = await invoke(getPost, { id: Number(params.postId) });
  return {
    title: `Post ${Post.id} - ${Post.name}`,
  };
}

type PostPageProps = {
  params: { postId: string };
};

export default async function Page({ params }: PostPageProps) {
  return (
    <div>
      <p>
        <Link href={"/posts"}>Posts</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Post postId={Number(params.postId)} />
      </Suspense>
    </div>
  );
}

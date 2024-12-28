'use client';
import { Suspense } from 'react';
import updatePost from '../mutations/updatePost';
import getPost from '../queries/getPost';

import { useMutation, useQuery } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';

export const EditPost = ({ postId }: { postId: number }) => {
	const [post, { setQueryData }] = useQuery(
		getPost,
		{ id: postId },
		{
			// This ensures the query never refreshes and overwrites the form data while the user is editing.
			staleTime: Infinity,
		},
	);
	const [updatePostMutation] = useMutation(updatePost);
	const router = useRouter();
	return (
		<>
			<div>
				<h1>Edit Post {post.id}</h1>
				<pre>{JSON.stringify(post, null, 2)}</pre>
				<Suspense fallback={<div>Loading...</div>}></Suspense>
			</div>
		</>
	);
};

import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostsList } from './components/PostsList';
import { NewPost } from '@/src/app/posts/components/NewPost';
import { IUser } from '@/src/intefaces';
import { invoke } from '@/src/app/blitz-server';
import getCurrentUser from '@/src/app/users/queries/getCurrentUser';

export const metadata: Metadata = {
	title: "Posts",
	description: "List of posts",
};

const Page = async () => {
	const currentUser:IUser | null = await invoke(getCurrentUser, null)
	return (
		<div>
			<p>
				<Link href={"/posts/new"}>Create Post</Link>
			</p>
			<Suspense fallback={<div>Loading...</div>}>
				<PostsList />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<NewPost user={currentUser} />
			</Suspense>
		</div>
	);
}
export default Page
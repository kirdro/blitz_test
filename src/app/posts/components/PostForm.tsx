import React, { FC, useState } from 'react';
import { invalidateQuery, useMutation } from '@blitzjs/rpc';
import createPost from '@/src/app/posts/mutations/createPost';
import { IUser } from '@/src/intefaces';
import getPosts from '@/src/app/posts/queries/getPosts';

export { FORM_ERROR } from 'src/app/components/Form';

export const PostForm: FC<{ user: IUser | null }> = ({ user }) => {
	const [createPostMutation] = useMutation(createPost);
	const [title, setTitle] = useState<string>('');

	const [text, setText] = useState<string>('');
	const onCreate = async () => {
		try {
			if (user) {
				const post = await createPostMutation({
					text,
					title,
					username: user ? (user.name ? user.name : '') : '',
				})
					.then(() => {
						setTitle('');
						setText('');
						invalidateQuery(getPosts);
					})
					.catch((err) => {});
			}

			// router.push(`/posts/${post.id}`);
		} catch (error: any) {
			console.error(error);
		}
	};

	return (
		<div>
			<input onChange={(e) => setTitle(e.target.value)} type='text' />
			<input onChange={(e) => setText(e.target.value)} type='text' />
			<button onClick={onCreate}>Create post</button>
		</div>
	);
};

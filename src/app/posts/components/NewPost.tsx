"use client";
import { PostForm } from './PostForm';
import { useMutation } from '@blitzjs/rpc';
import createPost from '../mutations/createPost';
import { FC } from 'react';
import { IUser } from '@/src/intefaces';

export const NewPost:FC<{user: IUser | null}> = ({user}) => {
	const [createPostMutation] = useMutation(createPost);

	return (
		<PostForm
			user={user}
		/>
	);
}

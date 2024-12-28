import { Metadata } from 'next';
import { Suspense } from 'react';
import { NewPost } from '../components/NewPost';

export const metadata: Metadata = {
  title: "New Project",
  description: "Create a new project",
};

export default function Page() {
  return (
    <div>
      <h1>Create New Project</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NewPost />
      </Suspense>
    </div>
  );
}

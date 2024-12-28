import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Project',
	description: 'Create a new project',
};

export default function Page() {
	return (
		<div>
			<h1>Create New Project</h1>
		</div>
	);
}

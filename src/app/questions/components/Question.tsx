"use client";
import { useMutation, useQuery } from '@blitzjs/rpc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import deleteQuestion from '../mutations/deleteQuestion';
import getQuestion from '../queries/getQuestion';
import updateChoice from '../../choices/mutations/updateChoice';

export const Question = ({ questionId }: { questionId: number }) => {
	const router = useRouter();
	const [deleteQuestionMutation] = useMutation(deleteQuestion);
	const [updateChoiceMutation] = useMutation(updateChoice)
	const [question, {refetch}] = useQuery(getQuestion, {id: questionId})

	const handleVote = async (id: number) => {
		try {
			await updateChoiceMutation({id})
			refetch()
		} catch (error) {
			alert("Error updating choice " + JSON.stringify(error, null, 2))
		}
	}

	return (
		<>
			<div>
				<h1>Project {question.text}</h1>
				<ul>
					{question.choices.map((choice) => (
						<li key={choice.id}>
							{choice.text} - {choice.votes} votes
							<button onClick={() => handleVote(choice.id)}>Vote</button>
						</li>
					))}
				</ul>

				<Link href={`/questions/${question.id}/edit`}>Edit</Link>

				<button
					type="button"
					onClick={async () => {
						if (window.confirm("This will be deleted")) {
							await deleteQuestionMutation({ id: question.id });
							router.push("/questions");
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

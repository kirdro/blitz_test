"use client";
import { usePaginatedQuery } from '@blitzjs/rpc';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getQuestions from '../queries/getQuestions';
import { Route } from 'next';

const ITEMS_PER_PAGE = 100;

export const QuestionsList = () => {
	const searchparams = useSearchParams()!;
	const page = Number(searchparams.get("page")) || 0;
	const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
		orderBy: { id: "asc" },
		skip: ITEMS_PER_PAGE * page,
		take: ITEMS_PER_PAGE,
	});
	const router = useRouter();
	const pathname = usePathname();

	const goToPreviousPage = () => {
		const params = new URLSearchParams(searchparams);
		params.set("page", (page - 1).toString());
		router.push((pathname + "?" + params.toString()) as Route);
	};
	const goToNextPage = () => {
		const params = new URLSearchParams(searchparams);
		params.set("page", (page + 1).toString());
		router.push((pathname + "?" + params.toString()) as Route);
	};

	return (
		<div>
			<ul>
				{questions.map((question) => (
					<li key={question.id}>
						<Link href={`/questions/${question.id}`}>{question.text}</Link>
						<ul>
							{question.choices.map((choice) => (
								<li key={choice.id}>
									{choice.text} - {choice.votes} votes
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>

			<button disabled={page === 0} onClick={goToPreviousPage}>
				Previous
			</button>
			<button disabled={!hasMore} onClick={goToNextPage}>
			Next
			</button>
		</div>
	);
};

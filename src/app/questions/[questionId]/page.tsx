import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { invoke } from 'src/app/blitz-server';
import getQuestion from '../queries/getQuestion';
import { Question } from '../components/Question';

export async function generateMetadata({
  params,
}: QuestionPageProps): Promise<Metadata> {
  const Question = await invoke(getQuestion, { id: Number(params.questionId) });
  return {
    title: `Question ${Question.id} - ${Question.text}`,
  };
}

type QuestionPageProps = {
  params: { questionId: string };
};

export default async function Page({ params }: QuestionPageProps) {
  return (
    <div>
      <p>
        <Link href={"/questions"}>Questions</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Question questionId={Number(params.questionId)} />
      </Suspense>
    </div>
  );
}

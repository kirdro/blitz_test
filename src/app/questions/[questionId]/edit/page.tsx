import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getQuestion from "../../queries/getQuestion";
import { EditQuestion } from "../../components/EditQuestion";

type EditQuestionPageProps = {
  params: { questionId: string };
};

export async function generateMetadata({
  params,
}: EditQuestionPageProps): Promise<Metadata> {
  const Question = await invoke(getQuestion, { id: Number(params.questionId) });
  return {
    title: `Edit Question ${Question.id} - ${Question.name}`,
  };
}

export default async function Page({ params }: EditQuestionPageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditQuestion questionId={Number(params.questionId)} />
      </Suspense>
    </div>
  );
}

import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { UpdateQuestionSchema } from '../schemas';

export default resolver.pipe(
	resolver.zod(UpdateQuestionSchema),
	resolver.authorize(),
	async ({ id, ...data }) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const question = await db.question.update({
			where: {id},
			data: {
				...data,
				choices: {
					upsert: data.choices.map((choice) => ({
						// Appears to be a prisma bug,
						// because `|| 0` shouldn't be needed
						where: {id: choice.id || 0},
						create: {text: choice.text},
						update: {text: choice.text},
					})),
				},
			},
			include: {
				choices: true,
			},
		})

		return question;
	}
);

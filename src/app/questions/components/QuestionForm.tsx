import React from 'react';
import { Form, FormProps } from 'src/app/components/Form';
import { LabeledTextField } from 'src/app/components/LabeledTextField';

import { z } from 'zod';

export { FORM_ERROR } from "src/app/components/Form";

export function QuestionForm<S extends z.ZodType<any, any>>(
	props: FormProps<S>
) {
	return (
		<Form<S> {...props}>
			<LabeledTextField
				name="text"
				label="Text"
				placeholder="Text"
				type="text"
			/>
			<LabeledTextField
				name="text"
				label="Text"
				placeholder="Text"
				type="text"
			/>
			<LabeledTextField name="choices.0.text" label="Choice 1" />
			<LabeledTextField name="choices.1.text" label="Choice 2" />
			<LabeledTextField name="choices.2.text" label="Choice 3" />
			{/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
		</Form>
	);
}

import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
import {describe, expectTypeOf, it} from 'vitest';

export const contactForm = () =>
	fragmentType({
		name: 'contactForm',
		type: 'document',
		title: 'Kontaktskjema',
		fields: [type(), data()],
		preview: {
			select: {
				title: 'type',
				subtitle: '_createdAt',
				_id: '_id',
			},
			prepare: (select) => ({
				title: `${select._id} [${select.title}]`,
				subtitle: new Date(select.subtitle).toLocaleDateString(),
			}),
		},
	});

const type = () =>
	fragmentField({
		name: 'type',
		type: 'string',
		title: 'Type',
		readOnly: true,
		validation: (Rule) => Rule.required(),
	});

const data = () =>
	fragmentField({
		name: 'data',
		type: 'string',
		title: 'Data',
		readOnly: true,
		validation: (Rule) => Rule.required(),
	});

describe('contact-form', () => {
	it('schema', async () => {
		type Test = {
			_type: 'contactForm';
			type: string;
			data: string;
		};

		const sanitySchema = contactForm();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

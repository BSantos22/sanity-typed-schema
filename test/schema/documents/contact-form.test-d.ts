import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
import type {ContactFormTest} from 'test/schema/documents/contact-form';
import {expectType} from 'test/utils';
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
		const sanitySchema = contactForm();
		const output = toOutput(sanitySchema);

		expectTypeOf(output._type).toEqualTypeOf<ContactFormTest['_type']>();
		expectTypeOf(output.data).toEqualTypeOf<ContactFormTest['data']>();
		expectTypeOf(output.type).toEqualTypeOf<ContactFormTest['type']>();
		expectTypeOf(output).toEqualTypeOf<ContactFormTest>();
		expectType<typeof output._type>().toStrictEqual<ContactFormTest['_type']>();
		expectType<typeof output.data>().toStrictEqual<ContactFormTest['data']>();
		expectType<typeof output.type>().toStrictEqual<ContactFormTest['type']>();
		expectType<typeof output>().toStrictEqual<ContactFormTest>();
	});
});

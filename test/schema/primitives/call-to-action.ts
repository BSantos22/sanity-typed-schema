import {fragmentField} from 'src/schema';
import {link} from 'test/schema/primitives/link';

export const callToAction = () =>
	fragmentField({
		title: 'Call To Action',
		name: 'callToAction',
		type: 'object',
		fields: [text(), ...link().fields],
		preview: {
			select: {
				title: 'text',
				type: 'type',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `Call To Action ${select.type === 'internal' ? 'intern' : 'ekstern'}`,
			}),
		},
	});

const text = () =>
	fragmentField({
		name: 'text',
		type: 'string',
		title: 'Tekst',
		validation: (Rule) => Rule.required(),
	});

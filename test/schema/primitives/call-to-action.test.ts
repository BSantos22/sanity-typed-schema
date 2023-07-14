import type {Reference} from '@sanity/types';
import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import {link} from 'test/schema/primitives/link.test';
import {describe, expectTypeOf, it} from 'vitest';

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

describe('call-to-action', () => {
	it('schema', async () => {
		type Test = {
			_type: 'callToAction';
			text: string;
			type: 'internal' | 'external';
			reference: Reference;
			query: string;
			href: string;
			targetBlank: boolean;
		};

		const sanitySchema = callToAction();
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

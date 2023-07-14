import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import type {LinkTest} from 'test/schema/primitives/link';
import {describe, expectTypeOf, it} from 'vitest';

export const link = () => {
	return fragmentField({
		title: 'Lenke',
		name: 'link',
		type: 'object',
		fields: [type(), reference(), query(), href(), targetBlank()],
		preview: {
			select: {
				title: 'reference.title',
				type: 'type',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `Lenke ${select.type === 'internal' ? 'intern' : 'ekstern'}`,
			}),
		},
	});
};

const type = () =>
	fragmentField({
		name: 'type',
		title: 'Type',
		type: 'string',
		initialValue: 'internal',
		options: {
			list: [
				{title: 'Intern', value: 'internal'},
				{title: 'Ekstern', value: 'external'},
			],
		},
		validation: (Rule) => Rule.required(),
	});

const reference = () =>
	fragmentField({
		name: 'reference',
		title: 'Intern lenke',
		type: 'reference',
		to: [{type: 'page'}, {type: 'article'}],
		hidden: ({parent}) => parent?.type !== 'internal',
	});

const query = () =>
	fragmentField({
		name: 'query',
		title: 'Query',
		type: 'string',
		hidden: ({parent}) => parent?.type !== 'internal',
	});

const href = () =>
	fragmentField({
		name: 'href',
		title: 'URL',
		type: 'url',
		validation: (Rule) =>
			Rule.uri({
				allowRelative: true,
				scheme: ['https', 'http', 'mailto', 'tel'],
			}),
		hidden: ({parent}) => parent?.type !== 'external',
	});

const targetBlank = () =>
	fragmentField({
		name: 'targetBlank',
		title: 'Åpne i nytt pane',
		type: 'boolean',
		initialValue: true,
		description: 'Åpne lenken i et nytt nettleservindu',
		validation: (Rule) => Rule.required(),
	});

describe('link', () => {
	it('schema', async () => {
		const sanitySchema = link();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.href).toEqualTypeOf<LinkTest['href']>();
		expectTypeOf(output.query).toEqualTypeOf<LinkTest['query']>();
		expectTypeOf(output.reference).toEqualTypeOf<LinkTest['reference']>();
		expectTypeOf(output.targetBlank).toEqualTypeOf<LinkTest['targetBlank']>();
		expectTypeOf(output.type).toEqualTypeOf<LinkTest['type']>();
		expectTypeOf(output).toEqualTypeOf<LinkTest>();
	});
});

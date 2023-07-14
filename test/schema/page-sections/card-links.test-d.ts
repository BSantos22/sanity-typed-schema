import {fragmentField} from 'src/schema';
import {link} from 'test/schema/primitives/link.test-d';
import {EMPHASIS, STRONG, portableText} from 'test/schema/primitives/portable-text.test-d';
import {icon} from 'test/schema/primitives/icon.test-d';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {CardLinksTest} from 'test/schema/page-sections/card-links';
import {expectType} from 'test/utils';

export const cardLinks = () =>
	fragmentField({
		name: 'cardLinks',
		title: 'Card lenker',
		type: 'object',
		fields: [cards()],
		preview: {
			prepare: () => ({
				title: 'Card lenker',
			}),
		},
	});

const cards = () =>
	fragmentField({
		name: 'links',
		title: 'Lenker',
		type: 'array',
		of: [card()],
		validation: (Rule) => Rule.required().min(1),
	});

const card = () =>
	fragmentField({
		name: 'link',
		title: 'Lenke',
		type: 'object',
		fields: [...link().fields, mainIcon(), title(), content(), supplier()],
		preview: {
			select: {
				title: 'title',
				type: 'type',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `Card lenke ${select.type === 'internal' ? 'intern' : 'ekstern'}`,
			}),
		},
	});

const mainIcon = () =>
	fragmentField({
		...icon(),
		validation: (Rule) => Rule.required(),
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const content = () =>
	fragmentField({
		...portableText({
			decorators: [EMPHASIS, STRONG],
			styles: [],
			annotations: [],
			lists: [],
			customTypes: [],
		}),
		name: 'content',
		title: 'Innhold',
	});

const supplier = () =>
	fragmentField({
		name: 'supplier',
		title: 'Leverandør',
		type: 'reference',
		to: [{type: 'supplier'}],
	});

describe('card-links', () => {
	it('schema', async () => {
		const sanitySchema = cardLinks();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.links).toEqualTypeOf<CardLinksTest['links']>();
		expectTypeOf(output).toEqualTypeOf<CardLinksTest>();
		expectType<typeof output.links>().toStrictEqual<CardLinksTest['links']>();
		expectType<typeof output>().toStrictEqual<CardLinksTest>();
	});
});

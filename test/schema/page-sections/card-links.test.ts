import {fragmentField} from 'src/schema';
import {link} from 'test/schema/primitives/link.test';
import {EMPHASIS, STRONG, portableText} from 'test/schema/primitives/portable-text.test';
import {icon} from 'test/schema/primitives/icon.test';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {CardLinksTest} from 'test/types/page-sections/card-links';

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
		expectTypeOf(output).toEqualTypeOf<CardLinksTest>();
	});
});

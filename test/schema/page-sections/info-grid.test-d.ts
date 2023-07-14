import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test-d';
import {
	BULLET,
	EMPHASIS,
	LINK,
	NUMBERED,
	STRONG,
	portableText,
} from 'test/schema/primitives/portable-text.test-d';
import {theme} from 'test/schema/primitives/theme.test-d';
import type {InfoGridTest} from 'test/types/page-sections/info-grid';
import {describe, expectTypeOf, it} from 'vitest';

export const infoGrid = () =>
	fragmentField({
		name: 'infoGrid',
		title: 'Info Grid',
		type: 'object',
		fields: [title(), items(), theme()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Info Grid',
			}),
		},
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const items = () =>
	fragmentField({
		name: 'items',
		title: 'Info Grid Items',
		type: 'array',
		of: [item()],
		validation: (Rule) => Rule.required().min(1).max(6),
	});

const item = () =>
	fragmentField({
		name: 'item',
		title: 'Info Grid Item',
		type: 'object',
		fields: [itemImage(), itemTitle(), itemContent()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Info Grid Item',
			}),
		},
		validation: (Rule) => Rule.required(),
	});

const itemImage = () =>
	fragmentField({
		...imageWeb({fields: [ALT_TEXT]}),
		title: 'Info Grid Image',
	});

const itemTitle = () =>
	fragmentField({
		name: 'title',
		title: 'Info Grid Title',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const itemContent = () =>
	fragmentField({
		...portableText({
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			styles: [],
			customTypes: [],
		}),
		name: 'content',
		title: 'Info Grid Content',
	});

describe('info-grid', () => {
	it('schema', async () => {
		const sanitySchema = infoGrid();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<InfoGridTest>();
	});
});
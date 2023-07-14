import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
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
import type {InfoGridTest} from 'test/schema/page-sections/info-grid';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const infoGrid = () =>
	defineField({
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
	defineField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const items = () =>
	defineField({
		name: 'items',
		title: 'Info Grid Items',
		type: 'array',
		of: [item()],
		validation: (Rule) => Rule.required().min(1).max(6),
	});

const item = () =>
	defineField({
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
	defineField({
		...imageWeb({fields: [ALT_TEXT]}),
		title: 'Info Grid Image',
	});

const itemTitle = () =>
	defineField({
		name: 'title',
		title: 'Info Grid Title',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const itemContent = () =>
	defineField({
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

		expectTypeOf(output.items).toEqualTypeOf<InfoGridTest['items']>();
		expectTypeOf(output.theme).toEqualTypeOf<InfoGridTest['theme']>();
		expectTypeOf(output.title).toEqualTypeOf<InfoGridTest['title']>();
		expectTypeOf(output).toEqualTypeOf<InfoGridTest>();
		expectType<typeof output.items>().toStrictEqual<InfoGridTest['items']>();
		expectType<typeof output.theme>().toStrictEqual<InfoGridTest['theme']>();
		expectType<typeof output.title>().toStrictEqual<InfoGridTest['title']>();
		expectType<typeof output>().toStrictEqual<InfoGridTest>();
	});
});

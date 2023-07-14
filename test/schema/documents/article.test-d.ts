import {defineField, defineType} from 'src/schema';
import {
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	H2,
	H3,
	H4,
	H5,
	H6,
	IMAGE,
	LINK,
	NUMBERED,
	STRONG,
	VIDEO_EMBED,
	portableText,
} from 'test/schema/primitives/portable-text.test-d';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test-d';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {ArticleTest} from 'test/schema/documents/article';
import {expectType} from 'test/utils';

export const article = () =>
	defineType({
		name: 'article',
		type: 'document',
		title: 'Artikkel',
		fields: [title(), slug(), image(), content()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
			}),
		},
	});

const title = () =>
	defineField({
		name: 'title',
		type: 'string',
		title: 'Tittel',
		validation: (Rule) => Rule.required(),
	});

const slug = () =>
	defineField({
		name: 'slug',
		type: 'slug',
		title: 'Slug',
		options: {
			source: 'title',
		},
		validation: (Rule) => Rule.required(),
	});

const image = () => imageWeb({fields: [ALT_TEXT]});

const content = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			styles: [H2, H3, H4, H5, H6],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION, IMAGE, VIDEO_EMBED],
		}),
		name: 'content',
		title: 'Innhold',
	});

describe('article', () => {
	it('schema', async () => {
		const sanitySchema = article();
		const output = toOutput(sanitySchema);

		expectTypeOf(output._type).toEqualTypeOf<ArticleTest['_type']>();
		expectTypeOf(output.content).toEqualTypeOf<ArticleTest['content']>();
		expectTypeOf(output.image).toEqualTypeOf<ArticleTest['image']>();
		expectTypeOf(output.slug).toEqualTypeOf<ArticleTest['slug']>();
		expectTypeOf(output.title).toEqualTypeOf<ArticleTest['title']>();
		expectTypeOf(output).toEqualTypeOf<ArticleTest>();
		expectType<typeof output._type>().toStrictEqual<ArticleTest['_type']>();
		expectType<typeof output.content>().toStrictEqual<ArticleTest['content']>();
		expectType<typeof output.image>().toStrictEqual<ArticleTest['image']>();
		expectType<typeof output.slug>().toStrictEqual<ArticleTest['slug']>();
		expectType<typeof output.title>().toStrictEqual<ArticleTest['title']>();
		expectType<typeof output>().toStrictEqual<ArticleTest>();
	});
});

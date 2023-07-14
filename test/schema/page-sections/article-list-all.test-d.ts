import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import {theme} from 'test/schema/primitives/theme.test-d';
import type {ArticleListAllTest} from 'test/schema/page-sections/article-list-all';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const articleListAll = () =>
	defineField({
		name: 'articleListAll',
		title: 'Artikkeloversikt',
		type: 'object',
		fields: [title(), theme()],
	});

const title = () =>
	defineField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

describe('article-list-all', () => {
	it('schema', async () => {
		const sanitySchema = articleListAll();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.title).toEqualTypeOf<ArticleListAllTest['title']>();
		expectTypeOf(output).toEqualTypeOf<ArticleListAllTest>();
		expectType<typeof output.title>().toStrictEqual<ArticleListAllTest['title']>();
		expectType<typeof output>().toStrictEqual<ArticleListAllTest>();
	});
});

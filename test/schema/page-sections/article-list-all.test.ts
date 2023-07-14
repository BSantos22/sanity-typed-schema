import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {theme} from 'test/schema/primitives/theme.test';
import {describe, expectTypeOf, it} from 'vitest';

export const articleListAll = () =>
	fragmentField({
		name: 'articleListAll',
		title: 'Artikkeloversikt',
		type: 'object',
		fields: [title(), theme()],
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

describe('article-list-all', () => {
	it('schema', async () => {
		type Test = {
			_type: 'articleListAll';
			title: string;
			theme: 'dark' | 'light';
		};

		const sanitySchema = articleListAll();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

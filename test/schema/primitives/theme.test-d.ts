import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import type {ThemeTest} from 'test/schema/primitives/theme';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

export const theme = () =>
	defineField({
		title: 'Tema',
		name: 'theme',
		type: 'string',
		initialValue: 'light',
		options: {
			list: [
				{title: 'Svart', value: 'dark'},
				{title: 'Hvit', value: 'light'},
			],
		},
		validation: (Rule) => Rule.required(),
	});

describe('theme', () => {
	it('schema', async () => {
		const sanitySchema = theme();
		const output = toOutput(sanitySchema);

		expectTypeOf(output).toEqualTypeOf<ThemeTest>();
		expectType<typeof output>().toStrictEqual<ThemeTest>();
	});
});

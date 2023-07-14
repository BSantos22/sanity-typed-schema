import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import {describe, expectTypeOf, it} from 'vitest';

export const theme = () =>
	fragmentField({
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
		type Test = 'dark' | 'light';

		const sanitySchema = theme();
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

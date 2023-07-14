import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
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
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

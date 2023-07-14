import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {describe, expectTypeOf, it} from 'vitest';

describe('email', () => {
	it('base schema', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'email',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<string>();
	});

	it('email does not support option list', async () => {
		// Well, it does, but it doesn't do anything, and therefore does not affect the output type
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'email',
			options: {
				list: [{value: 'test1'}, {value: 'test2'}],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<string>();
	});
});

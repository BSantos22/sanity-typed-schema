import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {describe, expectTypeOf, it} from 'vitest';

describe('string', () => {
	it('base schema', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'string',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<string>();
	});

	it('schema with object options', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'string',
			options: {
				list: [{value: 'test1'}, {value: 'test2'}],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<'test1' | 'test2'>();
	});

	it('schema with value options', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'string',
			options: {
				list: ['test3', 'test4'],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<'test3' | 'test4'>();
	});
});

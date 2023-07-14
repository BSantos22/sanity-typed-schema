import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('text', () => {
	it('base schema', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'text',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<string>();
		expectType<typeof output>().toStrictEqual<string>();
	});

	it('schema with object options', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'text',
			options: {
				list: [{value: 'test1'}, {value: 'test2'}],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<'test1' | 'test2'>();
		expectType<typeof output>().toStrictEqual<'test1' | 'test2'>();
	});

	it('schema with value options', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'text',
			options: {
				list: ['test3', 'test4'],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<'test3' | 'test4'>();
		expectType<typeof output>().toStrictEqual<'test3' | 'test4'>();
	});
});

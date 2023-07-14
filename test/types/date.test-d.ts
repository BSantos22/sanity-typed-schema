import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('date', () => {
	it('base schema', async () => {
		const sanitySchema = defineField({
			name: 'test',
			type: 'date',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<string>();
		expectType<typeof output>().toStrictEqual<string>();
	});

	it('date does not support option list', async () => {
		// Well, it does, but it doesn't do anything, and therefore does not affect the output type
		const sanitySchema = defineField({
			name: 'test',
			type: 'date',
			options: {
				list: [{value: 'test1'}, {value: 'test2'}],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<string>();
		expectType<typeof output>().toStrictEqual<string>();
	});
});

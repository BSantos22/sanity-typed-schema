import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('boolean', () => {
	it('base schema', async () => {
		const sanitySchema = defineField({
			name: 'test',
			type: 'boolean',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<boolean>();
		expectType<typeof output>().toStrictEqual<boolean>();
	});

	it('boolean does not support option list', async () => {
		// Well, it does, but it doesn't do anything, and therefore does not affect the output type
		const sanitySchema = defineField({
			name: 'test',
			type: 'boolean',
			options: {
				list: [{value: true}],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<boolean>();
		expectType<typeof output>().toStrictEqual<boolean>();
	});
});

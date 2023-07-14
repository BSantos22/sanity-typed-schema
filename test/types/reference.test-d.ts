import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('reference', () => {
	it('base schema', async () => {
		const sanitySchema = defineField({
			name: 'test',
			type: 'reference',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'reference';
			_ref: string;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'reference';
			_ref: string;
		}>();
	});

	it('reference does not support option list', async () => {
		// Well, it does, but it doesn't do anything, and therefore does not affect the output type
		const sanitySchema = defineField({
			name: 'test',
			type: 'reference',
			options: {
				list: [
					{
						value: {
							_type: 'reference',
							_ref: 'test',
						},
					},
					{
						value: {
							_type: 'reference',
							_ref: 'test2',
						},
					},
				],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'reference';
			_ref: string;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'reference';
			_ref: string;
		}>();
	});
});

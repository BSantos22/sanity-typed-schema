import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {describe, expectTypeOf, it} from 'vitest';

describe('number', () => {
	it('base schema', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'number',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<number>();
	});

	it('schema with object options', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'number',
			options: {
				list: [{value: 1}, {value: 42}],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<1 | 42>();
	});

	it('schema with value options', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'number',
			options: {
				list: [11, 121, 12, 144, 13, 169],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<11 | 121 | 12 | 144 | 13 | 169>();
	});
});

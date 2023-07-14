import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import {describe, expectTypeOf, it} from 'vitest';

export const icon = () =>
	fragmentField({
		title: 'Ikon',
		name: 'icon',
		type: 'string',
		options: {
			list: [
				{title: 'Bilglass', value: 'car-glass'},
				{title: 'Dekk', value: 'tyres'},
				{title: 'Bilverksted', value: 'services'},
				{title: 'Vei', value: 'road'},
				{title: 'Elbil', value: 'e-car'},
				{title: 'Steinsprut', value: 'crack'},
			],
		},
	});

describe('icon', () => {
	it('schema', async () => {
		type Test = 'car-glass' | 'tyres' | 'services' | 'road' | 'e-car' | 'crack';

		const sanitySchema = icon();
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

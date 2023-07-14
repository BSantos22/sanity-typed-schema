import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import type {IconTest} from 'test/schema/primitives/icon';
import {expectType} from 'test/utils';
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
		const sanitySchema = icon();
		const output = toOutput(sanitySchema);

		expectTypeOf(output).toEqualTypeOf<IconTest>();
		expectType<typeof output>().toStrictEqual<IconTest>();
	});
});

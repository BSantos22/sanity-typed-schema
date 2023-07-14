import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import type {LicensePlateTest} from 'test/schema/page-sections/license-plate';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

export const licensePlate = () =>
	defineField({
		name: 'licensePlate',
		title: 'Nummerplater',
		type: 'object',
		fields: [title(), label()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Nummerplater',
			}),
		},
	});

const title = () =>
	defineField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const label = () =>
	defineField({
		name: 'label',
		title: 'Label',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

describe('license-plate', () => {
	it('schema', async () => {
		const sanitySchema = licensePlate();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.label).toEqualTypeOf<LicensePlateTest['label']>();
		expectTypeOf(output.title).toEqualTypeOf<LicensePlateTest['title']>();
		expectTypeOf(output).toEqualTypeOf<LicensePlateTest>();
		expectType<(typeof output)['label']>().toStrictEqual<LicensePlateTest['label']>();
		expectType<(typeof output)['title']>().toStrictEqual<LicensePlateTest['title']>();
		expectType<typeof output>().toStrictEqual<LicensePlateTest>();
	});
});

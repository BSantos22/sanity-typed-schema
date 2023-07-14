import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import type {LicensePlateTest} from 'test/schema/page-sections/license-plate';
import {describe, expectTypeOf, it} from 'vitest';

export const licensePlate = () =>
	fragmentField({
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
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const label = () =>
	fragmentField({
		name: 'label',
		title: 'Label',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

describe('license-plate', () => {
	it('schema', async () => {
		const sanitySchema = licensePlate();
		type Output = OutputType<typeof sanitySchema>;

		expectTypeOf<Output['label']>().toEqualTypeOf<LicensePlateTest['label']>();
		expectTypeOf<Output['title']>().toEqualTypeOf<LicensePlateTest['title']>();
		expectTypeOf<Output>().toEqualTypeOf<LicensePlateTest>();
	});
});

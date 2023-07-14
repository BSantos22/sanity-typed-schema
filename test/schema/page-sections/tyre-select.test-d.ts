import {defineField} from 'src/schema';
import {EMPHASIS, LINK, STRONG, portableText} from 'test/schema/primitives/portable-text.test-d';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test-d';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {TyreSelectTest} from 'test/schema/page-sections/tyre-select';
import {expectType} from 'test/utils';

export const tyreSelect = () =>
	defineField({
		name: 'tyreSelect',
		title: 'Dekkvalg',
		type: 'object',
		fields: [title(), summerTyreDates(), winterTyreDates(), description(), image()],
		preview: {
			prepare: () => ({
				title: 'Dekkvalg',
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

const summerTyreDates = () =>
	defineField({
		name: 'summerTyreDates',
		title: 'Datoperiode for sommerdekk',
		type: 'object',
		fields: [summerTyreStartDate(), summerTyreEndDate()],
	});

const summerTyreStartDate = () =>
	defineField({
		name: 'start',
		title: 'Startdato for sommerdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const summerTyreEndDate = () =>
	defineField({
		name: 'end',
		title: 'Sluttdato for sommerdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const winterTyreDates = () =>
	defineField({
		name: 'winterTyreDates',
		title: 'Datoperiode for vinsterdekk',
		type: 'object',
		fields: [winterTyreStartDate(), winterTyreEndDate()],
	});

const winterTyreStartDate = () =>
	defineField({
		name: 'start',
		title: 'Startdato for vinterdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const winterTyreEndDate = () =>
	defineField({
		name: 'end',
		title: 'Sluttdato for vinterdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const tyreMonth = () =>
	defineField({
		name: 'month',
		title: 'Måned',
		type: 'number',
		validation: (Rule) => Rule.required(),
	});

const tyreDay = () =>
	defineField({
		name: 'day',
		title: 'Dag',
		type: 'number',
		validation: (Rule) => Rule.required(),
	});

const description = () =>
	defineField({
		name: 'description',
		title: 'Beskrivelse',
		type: 'object',
		fields: [descriptionUnselected(), descriptionSelected()],
	});

const descriptionUnselected = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
		}),
		name: 'unselected',
		title: 'Beskrivelse (ikke valgt)',
	});

const descriptionSelected = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
		}),
		name: 'selected',
		title: 'Beskrivelse (valgt)',
	});

const image = () =>
	defineField({
		...imageWeb({fields: [ALT_TEXT]}),
		title: 'Dekkbilde',
	});

describe('tyre-select', () => {
	it('schema', async () => {
		const sanitySchema = tyreSelect();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.description).toEqualTypeOf<TyreSelectTest['description']>();
		expectTypeOf(output.image).toEqualTypeOf<TyreSelectTest['image']>();
		expectTypeOf(output.summerTyreDates).toEqualTypeOf<TyreSelectTest['summerTyreDates']>();
		expectTypeOf(output.title).toEqualTypeOf<TyreSelectTest['title']>();
		expectTypeOf(output.winterTyreDates).toEqualTypeOf<TyreSelectTest['winterTyreDates']>();
		expectTypeOf(output).toEqualTypeOf<TyreSelectTest>();
		expectType<typeof output.description>().toStrictEqual<TyreSelectTest['description']>();
		expectType<typeof output.image>().toStrictEqual<TyreSelectTest['image']>();
		expectType<typeof output.summerTyreDates>().toStrictEqual<
			TyreSelectTest['summerTyreDates']
		>();
		expectType<typeof output.title>().toStrictEqual<TyreSelectTest['title']>();
		expectType<typeof output.winterTyreDates>().toStrictEqual<
			TyreSelectTest['winterTyreDates']
		>();
		expectType<typeof output>().toStrictEqual<TyreSelectTest>();
	});
});

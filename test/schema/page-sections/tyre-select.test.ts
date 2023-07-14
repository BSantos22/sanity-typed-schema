import {fragmentField} from 'src/schema';
import {EMPHASIS, LINK, STRONG, portableText} from 'test/schema/primitives/portable-text.test';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {SetOptional} from 'type-fest';
import type {PortableTextBlock} from '@portabletext/types';
import type {Reference} from '@sanity/types';

export const tyreSelect = () =>
	fragmentField({
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
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const summerTyreDates = () =>
	fragmentField({
		name: 'summerTyreDates',
		title: 'Datoperiode for sommerdekk',
		type: 'object',
		fields: [summerTyreStartDate(), summerTyreEndDate()],
	});

const summerTyreStartDate = () =>
	fragmentField({
		name: 'start',
		title: 'Startdato for sommerdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const summerTyreEndDate = () =>
	fragmentField({
		name: 'end',
		title: 'Sluttdato for sommerdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const winterTyreDates = () =>
	fragmentField({
		name: 'winterTyreDates',
		title: 'Datoperiode for vinsterdekk',
		type: 'object',
		fields: [winterTyreStartDate(), winterTyreEndDate()],
	});

const winterTyreStartDate = () =>
	fragmentField({
		name: 'start',
		title: 'Startdato for vinterdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const winterTyreEndDate = () =>
	fragmentField({
		name: 'end',
		title: 'Sluttdato for vinterdekk',
		type: 'object',
		fields: [tyreMonth(), tyreDay()],
	});

const tyreMonth = () =>
	fragmentField({
		name: 'month',
		title: 'Måned',
		type: 'number',
		validation: (Rule) => Rule.required(),
	});

const tyreDay = () =>
	fragmentField({
		name: 'day',
		title: 'Dag',
		type: 'number',
		validation: (Rule) => Rule.required(),
	});

const description = () =>
	fragmentField({
		name: 'description',
		title: 'Beskrivelse',
		type: 'object',
		fields: [descriptionUnselected(), descriptionSelected()],
	});

const descriptionUnselected = () =>
	fragmentField({
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
	fragmentField({
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
	fragmentField({
		...imageWeb({fields: [ALT_TEXT]}),
		title: 'Dekkbilde',
	});

describe('text-with-image', () => {
	it('schema', async () => {
		type Test = {
			_type: 'tyreSelect';
			title: string;
			summerTyreDates: {
				_type: 'summerTyreDates';
				start: {
					_type: 'start';
					month: number;
					day: number;
				};
				end: {
					_type: 'end';
					month: number;
					day: number;
				};
			};
			winterTyreDates: {
				_type: 'winterTyreDates';
				start: {
					_type: 'start';
					month: number;
					day: number;
				};
				end: {
					_type: 'end';
					month: number;
					day: number;
				};
			};
			description: {
				_type: 'description';
				selected: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
				unselected: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			};
			image: {
				_type: 'image';
				asset: Reference;
				hotspot: {
					_type?: 'sanity.imageHotspot';
					width: number;
					height: number;
					x: number;
					y: number;
				};
				altText: string;
			};
		};

		const sanitySchema = tyreSelect();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});
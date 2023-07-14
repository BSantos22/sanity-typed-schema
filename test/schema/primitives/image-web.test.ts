import type {Reference} from '@sanity/types';
import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import {describe, expectTypeOf, it} from 'vitest';

export const ALT_TEXT = Symbol('altText');
export const CAPTION = Symbol('caption');
export const CREDIT = Symbol('credit');
export const WIDTH = Symbol('width');

const fieldDefinitions = {
	[ALT_TEXT]: {name: 'altText', title: 'Alternativ tekst', type: 'string'},
	[CAPTION]: {name: 'caption', title: 'Bildetekst', type: 'string'},
	[CREDIT]: {name: 'credit', title: 'Bildekreditt', type: 'string'},
	[WIDTH]: {name: 'width', title: 'Bredde', type: 'number'},
} as const;

type Field = keyof typeof fieldDefinitions;

export const imageWeb = <const T extends readonly Field[]>(args: {fields: T}) => {
	const fields = args.fields.map((field) => fieldDefinitions[field]) as unknown as {
		[K in keyof T]: (typeof fieldDefinitions)[T[K]];
	};
	return fragmentField({
		name: 'image',
		title: 'Bilde',
		type: 'image',
		options: {
			hotspot: true,
		},
		fields,
		preview: {
			select: {
				media: 'asset',
				title: 'altText',
			},
			prepare: (select) => ({
				title: select.title,
				media: select.media,
			}),
		},
	});
};

describe('image-web', () => {
	it('schema', async () => {
		type Test = {
			_type: 'image';
			asset: Reference;
			hotspot: {
				_type?: 'sanity.imageHotspot';
				width: number;
				height: number;
				x: number;
				y: number;
			};
		};

		const sanitySchema = imageWeb({fields: []});
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});

	it('schema with fields', async () => {
		type Test = {
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
			caption: string;
		};

		const sanitySchema = imageWeb({fields: [ALT_TEXT, CAPTION]});
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});

	it('schema with fields', async () => {
		type Test = {
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
			caption: string;
			credit: string;
			width: number;
		};

		const sanitySchema = imageWeb({fields: [ALT_TEXT, CAPTION, CREDIT, WIDTH]});
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import type {
	ImageWebTestAll,
	ImageWebTestAltTextCaption,
	ImageWebTestBase,
} from 'test/types/primitives/image-web';
import {describe, expectTypeOf, it} from 'vitest';

export const ALT_TEXT = {name: 'altText', title: 'Alternativ tekst', type: 'string'} as const;
export const CAPTION = {name: 'caption', title: 'Bildetekst', type: 'string'} as const;
export const CREDIT = {name: 'credit', title: 'Bildekreditt', type: 'string'} as const;
export const WIDTH = {name: 'width', title: 'Bredde', type: 'number'} as const;

type Field = typeof ALT_TEXT | typeof CAPTION | typeof CREDIT | typeof WIDTH;

export const imageWeb = <const F extends readonly Field[]>(args: {fields: F}) => {
	return fragmentField({
		name: 'image',
		title: 'Bilde',
		type: 'image',
		options: {
			hotspot: true,
		},
		fields: args.fields,
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
		const sanitySchema = imageWeb({fields: []});
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<ImageWebTestBase>();
	});

	it('schema with some fields', async () => {
		const sanitySchema = imageWeb({fields: [ALT_TEXT, CAPTION]});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<ImageWebTestAltTextCaption>();
	});

	it('schema with all fields', async () => {
		const sanitySchema = imageWeb({fields: [ALT_TEXT, CAPTION, CREDIT, WIDTH]});
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<ImageWebTestAll>();
	});
});

import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import type {
	ImageWebTestAll,
	ImageWebTestAltTextCaption,
	ImageWebTestBase,
} from 'test/schema/primitives/image-web';
import {expectType} from 'test/utils';
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
		const output = toOutput(sanitySchema);

		expectTypeOf(output.asset).toEqualTypeOf<ImageWebTestBase['asset']>();
		expectTypeOf(output.crop).toEqualTypeOf<ImageWebTestBase['crop']>();
		expectTypeOf(output.hotspot).toEqualTypeOf<ImageWebTestBase['hotspot']>();
		expectTypeOf(output).toEqualTypeOf<ImageWebTestBase>();
		expectType<typeof output.asset>().toStrictEqual<ImageWebTestBase['asset']>();
		expectType<typeof output.crop>().toStrictEqual<ImageWebTestBase['crop']>();
		expectType<typeof output.hotspot>().toStrictEqual<ImageWebTestBase['hotspot']>();
		expectType<typeof output>().toStrictEqual<ImageWebTestBase>();
	});

	it('schema with some fields', async () => {
		const sanitySchema = imageWeb({fields: [ALT_TEXT, CAPTION]});
		const output = toOutput(sanitySchema);

		expectTypeOf(output.asset).toEqualTypeOf<ImageWebTestAltTextCaption['asset']>();
		expectTypeOf(output.crop).toEqualTypeOf<ImageWebTestAltTextCaption['crop']>();
		expectTypeOf(output.hotspot).toEqualTypeOf<ImageWebTestAltTextCaption['hotspot']>();
		expectTypeOf(output.altText).toEqualTypeOf<ImageWebTestAltTextCaption['altText']>();
		expectTypeOf(output.caption).toEqualTypeOf<ImageWebTestAltTextCaption['caption']>();
		expectTypeOf(output).toEqualTypeOf<ImageWebTestAltTextCaption>();
		expectType<typeof output.asset>().toStrictEqual<ImageWebTestAltTextCaption['asset']>();
		expectType<typeof output.crop>().toStrictEqual<ImageWebTestAltTextCaption['crop']>();
		expectType<typeof output.hotspot>().toStrictEqual<ImageWebTestAltTextCaption['hotspot']>();
		expectType<typeof output.altText>().toStrictEqual<ImageWebTestAltTextCaption['altText']>();
		expectType<typeof output.caption>().toStrictEqual<ImageWebTestAltTextCaption['caption']>();
		expectType<typeof output>().toStrictEqual<ImageWebTestAltTextCaption>();
	});

	it('schema with all fields', async () => {
		const sanitySchema = imageWeb({fields: [ALT_TEXT, CAPTION, CREDIT, WIDTH]});
		const output = toOutput(sanitySchema);

		expectTypeOf(output.asset).toEqualTypeOf<ImageWebTestAll['asset']>();
		expectTypeOf(output.crop).toEqualTypeOf<ImageWebTestAll['crop']>();
		expectTypeOf(output.hotspot).toEqualTypeOf<ImageWebTestAll['hotspot']>();
		expectTypeOf(output.altText).toEqualTypeOf<ImageWebTestAll['altText']>();
		expectTypeOf(output.caption).toEqualTypeOf<ImageWebTestAll['caption']>();
		expectTypeOf(output.credit).toEqualTypeOf<ImageWebTestAll['credit']>();
		expectTypeOf(output.width).toEqualTypeOf<ImageWebTestAll['width']>();
		expectTypeOf(output).toEqualTypeOf<ImageWebTestAll>();
		expectType<typeof output.asset>().toStrictEqual<ImageWebTestAll['asset']>();
		expectType<typeof output.crop>().toStrictEqual<ImageWebTestAll['crop']>();
		expectType<typeof output.hotspot>().toStrictEqual<ImageWebTestAll['hotspot']>();
		expectType<typeof output.altText>().toStrictEqual<ImageWebTestAll['altText']>();
		expectType<typeof output.caption>().toStrictEqual<ImageWebTestAll['caption']>();
		expectType<typeof output.credit>().toStrictEqual<ImageWebTestAll['credit']>();
		expectType<typeof output.width>().toStrictEqual<ImageWebTestAll['width']>();
		expectType<typeof output>().toStrictEqual<ImageWebTestAll>();
	});
});

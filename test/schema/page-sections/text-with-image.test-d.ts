import {defineField} from 'src/schema';
import {textBlock} from 'test/schema/primitives/text-block.test-d';
import {imageWeb, ALT_TEXT} from 'test/schema/primitives/image-web.test-d';
import {
	BIG_TEXT,
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	FOOTNOTE,
	H2,
	H3,
	H4,
	H5,
	H6,
	LINK,
	NUMBERED,
	STRONG,
} from 'test/schema/primitives/portable-text.test-d';
import {theme} from 'test/schema/primitives/theme.test-d';
import {icon} from 'test/schema/primitives/icon.test-d';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {TextWithImageTest} from 'test/schema/page-sections/text-with-image';
import {expectType} from 'test/utils';

export const textWithImage = () =>
	defineField({
		name: 'textWithImage',
		title: 'Tekst med bilde',
		type: 'object',
		fields: [content(), backgroundIcon(), imageSide(), image(), theme()],
		preview: {
			select: {
				annotation: 'content.annotation',
				title: 'content.title',
			},
			prepare: (select) => ({
				title: select.annotation ?? select.title,
				subtitle: 'Tekst med bilde',
			}),
		},
	});

const backgroundIcon = () =>
	defineField({
		...icon(),
		name: 'backgroundIcon',
		title: 'Bakgrunnsikon',
	});

const content = () =>
	defineField({
		...textBlock({
			styles: [H2, H3, H4, H5, H6, BIG_TEXT, FOOTNOTE],
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION],
		}),
		name: 'content',
		validation: (Rule) => Rule.required(),
	});

const image = () =>
	defineField({
		...imageWeb({fields: [ALT_TEXT]}),
		validation: (Rule) => Rule.required(),
	});

const imageSide = () =>
	defineField({
		name: 'imageSide',
		title: 'Bilde side',
		type: 'string',
		options: {
			list: [
				{title: 'Venstre', value: 'left'},
				{title: 'Høyre', value: 'right'},
			],
			layout: 'radio',
		},
		initialValue: 'right',
		validation: (Rule) => Rule.required(),
	});

describe('text-with-image', () => {
	it('schema', async () => {
		const sanitySchema = textWithImage();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.backgroundIcon).toEqualTypeOf<TextWithImageTest['backgroundIcon']>();
		expectTypeOf(output.content).toEqualTypeOf<TextWithImageTest['content']>();
		expectTypeOf(output.image).toEqualTypeOf<TextWithImageTest['image']>();
		expectTypeOf(output.imageSide).toEqualTypeOf<TextWithImageTest['imageSide']>();
		expectTypeOf(output.theme).toEqualTypeOf<TextWithImageTest['theme']>();
		expectTypeOf(output).toEqualTypeOf<TextWithImageTest>();
		expectType<typeof output.backgroundIcon>().toStrictEqual<
			TextWithImageTest['backgroundIcon']
		>();
		expectType<typeof output.content>().toStrictEqual<TextWithImageTest['content']>();
		expectType<typeof output.image>().toStrictEqual<TextWithImageTest['image']>();
		expectType<typeof output.imageSide>().toStrictEqual<TextWithImageTest['imageSide']>();
		expectType<typeof output.theme>().toStrictEqual<TextWithImageTest['theme']>();
		expectType<typeof output>().toStrictEqual<TextWithImageTest>();
	});
});

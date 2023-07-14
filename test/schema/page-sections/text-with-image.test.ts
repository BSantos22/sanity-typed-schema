import {fragmentField} from 'src/schema';
import {textBlock} from 'test/schema/primitives/text-block.test';
import {imageWeb, ALT_TEXT} from 'test/schema/primitives/image-web.test';
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
} from 'test/schema/primitives/portable-text.test';
import {theme} from 'test/schema/primitives/theme.test';
import {icon} from 'test/schema/primitives/icon.test';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {SetOptional} from 'type-fest';
import type {PortableTextBlock} from '@portabletext/types';
import type {Reference} from '@sanity/types';

export const textWithImage = () =>
	fragmentField({
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
	fragmentField({
		...icon(),
		name: 'backgroundIcon',
		title: 'Bakgrunnsikon',
	});

const content = () =>
	fragmentField({
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
	fragmentField({
		...imageWeb({fields: [ALT_TEXT]}),
		validation: (Rule) => Rule.required(),
	});

const imageSide = () =>
	fragmentField({
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
		type Test = {
			_type: 'textWithImage';
			content: {
				_type: 'content';
				annotation: string;
				title: string;
				content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			};
			backgroundIcon: 'car-glass' | 'tyres' | 'services' | 'road' | 'e-car' | 'crack';
			imageSide: 'left' | 'right';
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
			theme: 'light' | 'dark';
		};

		const sanitySchema = textWithImage();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

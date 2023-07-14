import {fragmentField, fragmentType} from 'src/schema';
import {
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	H2,
	H3,
	H4,
	H5,
	H6,
	IMAGE,
	LINK,
	NUMBERED,
	STRONG,
	VIDEO_EMBED,
	portableText,
} from 'test/schema/primitives/portable-text.test';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {SetOptional} from 'type-fest';
import type {PortableTextBlock} from '@portabletext/types';
import type {Reference} from '@sanity/types';

export const article = () =>
	fragmentType({
		name: 'article',
		type: 'document',
		title: 'Artikkel',
		fields: [title(), slug(), image(), content()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
			}),
		},
	});

const title = () =>
	fragmentField({
		name: 'title',
		type: 'string',
		title: 'Tittel',
		validation: (Rule) => Rule.required(),
	});

const slug = () =>
	fragmentField({
		name: 'slug',
		type: 'slug',
		title: 'Slug',
		options: {
			source: 'title',
		},
		validation: (Rule) => Rule.required(),
	});

const image = () => imageWeb({fields: [ALT_TEXT]});

const content = () =>
	fragmentField({
		...portableText({
			annotations: [LINK],
			styles: [H2, H3, H4, H5, H6],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION, IMAGE, VIDEO_EMBED],
		}),
		name: 'content',
		title: 'Innhold',
	});

describe('article', () => {
	it('schema', async () => {
		type Test = {
			_type: 'article';
			title: string;
			slug: {
				_type: 'slug';
				current?: string;
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
			content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
		};

		const sanitySchema = article();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

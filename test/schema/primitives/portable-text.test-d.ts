import {defineField} from 'src/schema';
import {videoEmbed} from 'test/schema/primitives/video-embed.test-d';
import {ALT_TEXT, CAPTION, CREDIT, WIDTH, imageWeb} from 'test/schema/primitives/image-web.test-d';
import {link} from 'test/schema/primitives/link.test-d';
import {callToAction} from 'test/schema/primitives/call-to-action.test-d';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {BlockDef} from 'src/types-schema';
import type {PortableTextTest} from 'test/schema/primitives/portable-text';
import {expectType} from 'test/utils';

// Styles
export const H1 = {title: 'H1', value: 'h1'} as const;
export const H2 = {title: 'H2', value: 'h2'} as const;
export const H3 = {title: 'H3', value: 'h3'} as const;
export const H4 = {title: 'H4', value: 'h4'} as const;
export const H5 = {title: 'H5', value: 'h5'} as const;
export const H6 = {title: 'H6', value: 'h6'} as const;
export const QUOTE = {title: 'Quote', value: 'quote'} as const;
export const BIG_TEXT = {
	title: 'Big text',
	value: 'bigText',
} as const;
export const FOOTNOTE = {
	title: 'Footnote',
	value: 'footnote',
} as const;

export type Styles =
	| typeof H1
	| typeof H2
	| typeof H3
	| typeof H4
	| typeof H5
	| typeof H6
	| typeof QUOTE
	| typeof BIG_TEXT
	| typeof FOOTNOTE;

// Annotations
export const LINK = link();
export type Annotations = typeof LINK;

// Lists
export const BULLET = {title: 'Bullet', value: 'bullet'} as const;
export const NUMBERED = {title: 'Numbered', value: 'number'} as const;
export type Lists = typeof BULLET | typeof NUMBERED;

// Decorators
export const STRONG = {title: 'Strong', value: 'strong'} as const;
export const EMPHASIS = {title: 'Emphasis', value: 'em'} as const;
export const CODE = {title: 'Code', value: 'code'} as const;
export const UNDERLINE = {title: 'Underline', value: 'underline'} as const;
export const STRIKE_THROUGH = {title: 'Strike-through', value: 'strike-through'} as const;
export const PRICE = {
	title: 'Price',
	value: 'price',
} as const;
export type Decorators =
	| typeof STRONG
	| typeof EMPHASIS
	| typeof CODE
	| typeof UNDERLINE
	| typeof STRIKE_THROUGH
	| typeof PRICE;

// Custom types
export const CALL_TO_ACTION = callToAction();
export const IMAGE = defineField({
	...imageWeb({fields: [ALT_TEXT, CREDIT, CAPTION, WIDTH]}),
	title: 'Bilde',
});
export const VIDEO_EMBED = videoEmbed();
export type CustomTypes = typeof CALL_TO_ACTION | typeof IMAGE | typeof VIDEO_EMBED;

// Portable text
export const portableText = <
	const S extends readonly Styles[],
	const A extends readonly Annotations[],
	const L extends readonly Lists[],
	const D extends readonly Decorators[],
	const C extends readonly CustomTypes[]
>(args: {
	styles: S;
	annotations: A;
	lists: L;
	decorators: D;
	customTypes: C;
}) => {
	// TODO: Add support for typing the annotations, decorators, lists and styles
	// In a perfect world, this wouldn't throw a
	// "Type instantiation is excessively deep and possibly infinite.ts(2589)" error
	// Hopefully it can be fixed later, but for now, this is the best we can do
	// The only downside is that we don't get autocomplete in the PortableTextReact component
	const of = [
		{
			type: 'block',
			lists: args.lists,
			marks: {
				annotations: args.annotations,
				decorators: args.decorators,
			},
			styles: [{title: 'Normal', value: 'normal'}, ...(args.styles ?? [])],
		},
		...(args.customTypes ?? []),
	] as unknown as BlockDef[];

	return defineField({
		name: 'portableText',
		title: 'Portable text',
		type: 'array',
		of,
	});
};

describe('portable-text', () => {
	it('schema', async () => {
		const sanitySchema = portableText({
			styles: [],
			annotations: [],
			lists: [],
			decorators: [],
			customTypes: [],
		});
		const output = toOutput(sanitySchema);

		expectTypeOf(output).toEqualTypeOf<PortableTextTest>();
		expectType<typeof output>().toStrictEqual<PortableTextTest>();
	});

	it('schema with fields', async () => {
		const sanitySchema = portableText({
			styles: [BIG_TEXT, H2, H3],
			annotations: [],
			lists: [],
			decorators: [STRONG],
			customTypes: [CALL_TO_ACTION],
		});
		const output = toOutput(sanitySchema);

		expectTypeOf(output).toEqualTypeOf<PortableTextTest>();
		expectType<typeof output>().toStrictEqual<PortableTextTest>();
	});
});

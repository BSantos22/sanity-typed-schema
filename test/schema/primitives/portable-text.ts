/* eslint-disable @typescript-eslint/no-namespace */
import {fragmentField} from 'src/schema';
import {videoEmbed} from 'test/schema/primitives/video-embed.test';
import {ALT_TEXT, CAPTION, CREDIT, imageWeb, WIDTH} from 'test/schema/primitives/image-web.test';
import {link} from 'test/schema/primitives/link.test';
import {callToAction} from 'test/schema/primitives/call-to-action.test';
import type {
	BlockDecoratorDefinition,
	BlockListDefinition,
	BlockStyleDefinition,
	FieldDefinition,
} from '@sanity/types';

// Styles
export const H1 = Symbol('h1');
export const H2 = Symbol('h2');
export const H3 = Symbol('h3');
export const H4 = Symbol('h4');
export const H5 = Symbol('h5');
export const H6 = Symbol('h6');
export const QUOTE = Symbol('quote');
export const BIG_TEXT = Symbol('bigText');
export const FOOTNOTE = Symbol('footnote');

namespace Styles {
	type Variants =
		| typeof H1
		| typeof H2
		| typeof H3
		| typeof H4
		| typeof H5
		| typeof H6
		| typeof QUOTE
		| typeof BIG_TEXT
		| typeof FOOTNOTE;
	type Definitions = {[key in Variants]: BlockStyleDefinition};

	export const definitions: Definitions = {
		[H1]: {title: 'H1', value: 'h1'},
		[H2]: {title: 'H2', value: 'h2'},
		[H3]: {title: 'H3', value: 'h3'},
		[H4]: {title: 'H4', value: 'h4'},
		[H5]: {title: 'H5', value: 'h5'},
		[H6]: {title: 'H6', value: 'h6'},
		[QUOTE]: {title: 'Quote', value: 'quote'},
		[BIG_TEXT]: {
			title: 'Big text',
			value: 'bigText',
		},
		[FOOTNOTE]: {
			title: 'Footnote',
			value: 'footnote',
		},
	};
	export type Types = keyof typeof definitions;
}

// Annotations
export const LINK = Symbol('link');

namespace Annotations {
	type Variants = typeof LINK;
	type Definitions = {[key in Variants]: FieldDefinition};

	export const definitions: Definitions = {
		[LINK]: link(),
	};
	export type Types = keyof typeof definitions;
}

// Lists
export const BULLET = Symbol('bullet');
export const NUMBERED = Symbol('number');

namespace Lists {
	type Variants = typeof BULLET | typeof NUMBERED;
	type Definitions = {[key in Variants]: BlockListDefinition};

	export const definitions: Definitions = {
		[BULLET]: {title: 'Bullet', value: 'bullet'},
		[NUMBERED]: {title: 'Numbered', value: 'number'},
	};
	export type Types = keyof typeof definitions;
}

// Decorators
export const STRONG = Symbol('strong');
export const EMPHASIS = Symbol('em');
export const CODE = Symbol('code');
export const UNDERLINE = Symbol('underline');
export const STRIKE_THROUGH = Symbol('strike-through');
export const PRICE = Symbol('price');

namespace Decorators {
	type Variants =
		| typeof STRONG
		| typeof EMPHASIS
		| typeof CODE
		| typeof UNDERLINE
		| typeof STRIKE_THROUGH
		| typeof PRICE;
	type Definitions = {
		[key in Variants]: BlockDecoratorDefinition;
	};

	export const definitions: Definitions = {
		[STRONG]: {title: 'Strong', value: 'strong'},
		[EMPHASIS]: {title: 'Emphasis', value: 'em'},
		[CODE]: {title: 'Code', value: 'code'},
		[UNDERLINE]: {title: 'Underline', value: 'underline'},
		[STRIKE_THROUGH]: {title: 'Strike-through', value: 'strike-through'},
		[PRICE]: {
			title: 'Price',
			value: 'price',
		},
	};
	export type Types = keyof typeof definitions;
}

// Custom types
export const CALL_TO_ACTION = Symbol('callToAction');
export const IMAGE = Symbol('image');
export const VIDEO_EMBED = Symbol('videoEmbed');

namespace Custom {
	type Variants = typeof CALL_TO_ACTION | typeof IMAGE | typeof VIDEO_EMBED;
	type Definitions = {[key in Variants]: FieldDefinition};

	export const definitions: Definitions = {
		[CALL_TO_ACTION]: callToAction(),
		[IMAGE]: fragmentField({
			...imageWeb({fields: [ALT_TEXT, CREDIT, CAPTION, WIDTH]}),
			title: 'Bilde',
		}),
		[VIDEO_EMBED]: videoEmbed(),
	};
	export type Types = keyof typeof definitions;
}

// Portable text
export type PortableTextArgs = {
	styles?: Styles.Types[];
	annotations?: Annotations.Types[];
	lists?: Lists.Types[];
	decorators?: Decorators.Types[];
	customTypes?: Custom.Types[];
};

export const portableText = (args?: PortableTextArgs) => {
	const styles = args?.styles?.map((style) => Styles.definitions[style]) ?? [];
	const annotations =
		args?.annotations?.map((annotation) => Annotations.definitions[annotation]) ?? [];
	const lists = args?.lists?.map((list) => Lists.definitions[list]) ?? [];
	const decorators =
		args?.decorators?.map((decorator) => Decorators.definitions[decorator]) ?? [];
	const customTypes =
		args?.customTypes?.map((customType) => Custom.definitions[customType]) ?? [];

	return fragmentField({
		name: 'portableText',
		title: 'Portable text',
		type: 'array',
		of: [
			{
				type: 'block',
				lists,
				marks: {
					annotations,
					decorators,
				},
				styles: [{title: 'Normal', value: 'normal'}, ...styles],
			},
			...customTypes,
		],
	});
};

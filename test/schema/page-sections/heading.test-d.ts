import {fragmentField} from 'src/schema';
import {
	BIG_TEXT,
	CALL_TO_ACTION,
	EMPHASIS,
	FOOTNOTE,
	LINK,
	portableText,
	STRONG,
} from 'test/schema/primitives/portable-text.test-d';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test-d';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {HeadingTest} from 'test/types/page-sections/heading';

export const heading = () =>
	fragmentField({
		name: 'heading',
		title: 'Heading',
		type: 'array',
		of: [textHeading(), hero()],
		validation: (Rule) => Rule.required().min(1),
	});

const textHeading = () =>
	fragmentField({
		name: 'textHeading',
		title: 'Tekst Heading',
		type: 'object',
		fields: [textHeadingTitle(), textHeadingBackgroundImage()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Heading',
			}),
		},
	});

const textHeadingTitle = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const textHeadingBackgroundImage = () =>
	fragmentField({
		...imageWeb({fields: []}),
		name: 'backgroundImage',
		title: 'Bakgrunnsbilde',
	});

const hero = () =>
	fragmentField({
		name: 'hero',
		title: 'Hero',
		type: 'object',
		groups: [
			{
				name: 'images',
				title: 'Bilder',
			},
		],
		fields: [heroTitle(), heroContent(), heroMainImage(), heroBackgroundImage()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Hero',
			}),
		},
	});

const heroTitle = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const heroMainImage = () =>
	fragmentField({
		...imageWeb({fields: [ALT_TEXT]}),
		name: 'mainImage',
		title: 'Hovedbilde',
		group: 'images',
		validation: (Rule) => Rule.required(),
	});

const heroBackgroundImage = () =>
	fragmentField({
		...imageWeb({fields: []}),
		name: 'backgroundImage',
		title: 'Bakgrunnsbilde',
		group: 'images',
		validation: (Rule) => Rule.required(),
	});

const heroContent = () =>
	fragmentField({
		...portableText({
			styles: [BIG_TEXT, FOOTNOTE],
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION],
			lists: [],
		}),
		name: 'content',
		title: 'Innhold',
	});

describe('heading', () => {
	it('schema', async () => {
		const sanitySchema = heading();
		const output = toOutput(sanitySchema);

		expectTypeOf(output).toEqualTypeOf<HeadingTest>();
	});
});

import {fragmentField} from 'src/schema';
import {textBlock} from 'test/schema/primitives/text-block.test-d';
import {
	BIG_TEXT,
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	FOOTNOTE,
	H3,
	H4,
	H5,
	H6,
	IMAGE,
	LINK,
	NUMBERED,
	STRONG,
} from 'test/schema/primitives/portable-text.test-d';
import {theme} from 'test/schema/primitives/theme.test-d';
import {toOutput} from 'src/convert';
import {describe, expectTypeOf, it} from 'vitest';
import type {TextTest} from 'test/schema/page-sections/text';

export const text = () =>
	fragmentField({
		name: 'textSection',
		title: 'Tekst',
		type: 'object',
		fields: [align(), width(), content(), theme()],
		preview: {
			select: {
				annotation: 'content.annotation',
				title: 'content.title',
			},
			prepare: (select) => ({
				title: select.annotation ?? select.title ?? 'Tekst',
				subtitle: select.annotation || select.title ? 'Tekst' : undefined,
			}),
		},
	});

const align = () =>
	fragmentField({
		name: 'align',
		title: 'Justering',
		type: 'string',
		options: {
			list: [
				{title: 'Venstre', value: 'left'},
				{title: 'Midtstilt', value: 'center'},
			],
			layout: 'radio',
		},
		initialValue: 'center',
		validation: (Rule) => Rule.required(),
	});

const width = () =>
	fragmentField({
		name: 'width',
		title: 'Bredde',
		type: 'string',
		initialValue: 'normal',
		options: {
			list: [
				{title: 'Normal', value: 'normal'},
				{title: 'Smal', value: 'narrow'},
			],
			layout: 'radio',
		},
		validation: (Rule) => Rule.required(),
	});

const content = () =>
	fragmentField({
		...textBlock({
			styles: [H3, H4, H5, H6, BIG_TEXT, FOOTNOTE],
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION, IMAGE],
		}),
		name: 'content',
	});

describe('text', () => {
	it('schema', async () => {
		const sanitySchema = text();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.align).toEqualTypeOf<TextTest['align']>();
		expectTypeOf(output.content).toEqualTypeOf<TextTest['content']>();
		expectTypeOf(output.theme).toEqualTypeOf<TextTest['theme']>();
		expectTypeOf(output.width).toEqualTypeOf<TextTest['width']>();
		expectTypeOf(output).toEqualTypeOf<TextTest>();
	});
});

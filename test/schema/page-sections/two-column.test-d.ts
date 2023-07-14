import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {IMAGE, portableText} from 'test/schema/primitives/portable-text.test-d';
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
	LINK,
	NUMBERED,
	STRONG,
} from 'test/schema/primitives/portable-text.test-d';
import {theme} from 'test/schema/primitives/theme.test-d';
import type {TwoColumnTest} from 'test/schema/page-sections/two-column';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const twoColumn = () =>
	fragmentField({
		name: 'twoColumn',
		title: 'To kolonner',
		type: 'object',
		fields: [title(), titleInvisible(), left(), right(), align(), theme()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'To kolonner',
			}),
		},
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const titleInvisible = () =>
	fragmentField({
		name: 'titleInvisible',
		title: 'Skjul tittel',
		type: 'boolean',
		initialValue: false,
		validation: (Rule) => Rule.required(),
	});

const left = () =>
	fragmentField({
		...portableText({
			styles: [H3, H4, H5, H6, BIG_TEXT, FOOTNOTE],
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION, IMAGE],
		}),
		name: 'left',
		title: 'Venstre',
	});

const right = () =>
	fragmentField({
		...portableText({
			styles: [H3, H4, H5, H6, BIG_TEXT, FOOTNOTE],
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION, IMAGE],
		}),
		name: 'right',
		title: 'Høyre',
	});

const align = () =>
	fragmentField({
		name: 'align',
		title: 'Innhold justering',
		type: 'string',
		options: {
			list: [
				{title: 'Venstre', value: 'left'},
				{title: 'Midtstilt', value: 'center'},
			],
			layout: 'radio',
		},
		initialValue: 'left',
		validation: (Rule) => Rule.required(),
	});

describe('two-column', () => {
	it('schema', async () => {
		const sanitySchema = twoColumn();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.align).toEqualTypeOf<TwoColumnTest['align']>();
		expectTypeOf(output.left).toEqualTypeOf<TwoColumnTest['left']>();
		expectTypeOf(output.right).toEqualTypeOf<TwoColumnTest['right']>();
		expectTypeOf(output.theme).toEqualTypeOf<TwoColumnTest['theme']>();
		expectTypeOf(output.title).toEqualTypeOf<TwoColumnTest['title']>();
		expectTypeOf(output.titleInvisible).toEqualTypeOf<TwoColumnTest['titleInvisible']>();
		expectTypeOf(output).toEqualTypeOf<TwoColumnTest>();
		expectType<typeof output.align>().toStrictEqual<TwoColumnTest['align']>();
		expectType<typeof output.left>().toStrictEqual<TwoColumnTest['left']>();
		expectType<typeof output.right>().toStrictEqual<TwoColumnTest['right']>();
		expectType<typeof output.theme>().toStrictEqual<TwoColumnTest['theme']>();
		expectType<typeof output.title>().toStrictEqual<TwoColumnTest['title']>();
		expectType<typeof output.titleInvisible>().toStrictEqual<TwoColumnTest['titleInvisible']>();
		expectType<typeof output>().toStrictEqual<TwoColumnTest>();
	});
});

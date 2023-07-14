import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {IMAGE, portableText} from 'test/schema/primitives/portable-text.test';
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
} from 'test/schema/primitives/portable-text.test';
import {theme} from 'test/schema/primitives/theme.test';
import type {TwoColumnTest} from 'test/types/page-sections/two-column';
import {describe, expectTypeOf, it} from 'vitest';

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
		expectTypeOf(output).toEqualTypeOf<TwoColumnTest>();
	});
});

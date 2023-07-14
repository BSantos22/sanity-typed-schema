import {fragmentField} from 'src/schema';
import {textBlock} from 'test/schema/primitives/text-block.test';
import {
	BIG_TEXT,
	BULLET,
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
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {SetOptional} from 'type-fest';
import type {PortableTextBlock} from '@portabletext/types';

export const services = () =>
	fragmentField({
		name: 'services',
		title: 'Tjenester',
		type: 'object',
		fields: [text()],
		preview: {
			select: {
				annotation: 'textBlock.annotation',
				title: 'textBlock.title',
			},
			prepare: (select) => ({
				title: select.annotation ?? select.title,
				subtitle: 'Tjenester',
			}),
		},
	});

const text = () =>
	textBlock({
		styles: [H3, H4, H5, H6, BIG_TEXT, FOOTNOTE],
		annotations: [LINK],
		lists: [BULLET, NUMBERED],
		decorators: [STRONG, EMPHASIS],
		customTypes: [],
	});

describe('services', () => {
	it('schema', async () => {
		type Test = {
			_type: 'services';
			textBlock: {
				_type: 'textBlock';
				annotation: string;
				title: string;
				content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			};
		};

		const sanitySchema = services();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});
import type {PortableTextBlock} from '@portabletext/types';
import type {Reference} from '@sanity/types';
import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	LINK,
	NUMBERED,
	STRONG,
	portableText,
} from 'test/schema/primitives/portable-text.test';
import {theme} from 'test/schema/primitives/theme.test';
import type {SetOptional} from 'type-fest';
import {describe, expectTypeOf, it} from 'vitest';

export const supplierSection = () =>
	fragmentField({
		name: 'supplierSection',
		title: 'Leverandør',
		type: 'object',
		fields: [supplier(), content(), theme()],
		preview: {
			select: {
				title: 'supplier.name',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Leverandør',
			}),
		},
	});

const supplier = () =>
	fragmentField({
		name: 'supplier',
		title: 'Leverandør',
		type: 'reference',
		to: [{type: 'supplier'}],
		validation: (Rule) => Rule.required(),
	});

const content = () =>
	fragmentField({
		...portableText({
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION],
			styles: [],
		}),
		name: 'content',
		title: 'Innhold',
	});

describe('supplier-section', () => {
	it('schema', async () => {
		type Test = {
			_type: 'supplierSection';
			supplier: Reference;
			content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			theme: 'light' | 'dark';
		};

		const sanitySchema = supplierSection();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

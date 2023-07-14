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
} from 'test/schema/primitives/portable-text.test-d';
import {theme} from 'test/schema/primitives/theme.test-d';
import type {SupplierSectionTest} from 'test/schema/page-sections/supplier';
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
		const sanitySchema = supplierSection();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.content).toEqualTypeOf<SupplierSectionTest['content']>();
		expectTypeOf(output.supplier).toEqualTypeOf<SupplierSectionTest['supplier']>();
		expectTypeOf(output.theme).toEqualTypeOf<SupplierSectionTest['theme']>();
		expectTypeOf(output).toEqualTypeOf<SupplierSectionTest>();
	});
});

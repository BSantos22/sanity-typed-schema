import type {Reference} from '@sanity/types';
import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
import {imageWeb} from 'test/schema/primitives/image-web.test';
import {describe, expectTypeOf, it} from 'vitest';

export const supplier = () =>
	fragmentType({
		name: 'supplier',
		type: 'document',
		title: 'Leverandør',
		fields: [name(), id(), logo()],
		preview: {
			select: {
				title: 'name',
			},
			prepare: (select) => ({
				title: select.title,
			}),
		},
	});

const name = () =>
	fragmentField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const id = () =>
	fragmentField({
		name: 'id',
		type: 'string',
		title: 'ID',
		validation: (Rule) => Rule.required(),
	});

const logo = () =>
	fragmentField({
		...imageWeb({fields: []}),
		name: 'logo',
		title: 'Logo',
		validation: (Rule) => Rule.required(),
	});

describe('supplier', () => {
	it('schema', async () => {
		type Test = {
			_type: 'supplier';
			name: string;
			id: string;
			logo: {
				_type: 'image';
				asset: Reference;
				hotspot: {
					_type?: 'sanity.imageHotspot';
					width: number;
					height: number;
					x: number;
					y: number;
				};
			};
		};

		const sanitySchema = supplier();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

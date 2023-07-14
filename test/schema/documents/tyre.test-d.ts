import {toOutput} from 'src/convert';
import {defineField, defineType} from 'src/schema';
import {BULLET, LINK, STRONG, portableText} from 'test/schema/primitives/portable-text.test-d';
import {NUMBERED} from 'test/schema/primitives/portable-text.test-d';
import {EMPHASIS} from 'test/schema/primitives/portable-text.test-d';
import type {TyreTest} from 'test/schema/documents/tyre';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const tyre = () =>
	defineType({
		name: 'tyre',
		type: 'document',
		title: 'Dekk',
		fields: [brand(), model(), type(), active(), description(), variants()],
		preview: {
			select: {
				title: 'model',
				subtitle: 'brand.name',
				active: 'active',
			},
			prepare: (select) => ({
				title: `${select.title}${select.active ? '' : ' [INAKTIV]'}`,
				subtitle: select.subtitle,
			}),
		},
	});

const brand = () =>
	defineField({
		name: 'brand',
		type: 'reference',
		title: 'Leverandør',
		to: [{type: 'supplier'}],
		validation: (Rule) => Rule.required(),
	});

const model = () =>
	defineField({
		name: 'model',
		type: 'string',
		title: 'Modell',
		validation: (Rule) => Rule.required(),
	});

const type = () =>
	defineField({
		name: 'type',
		type: 'string',
		title: 'Type',
		validation: (Rule) => Rule.required(),
	});

const description = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			lists: [BULLET, NUMBERED],
			styles: [],
			customTypes: [],
		}),
		name: 'description',
		title: 'Beskrivelse',
	});

const variants = () =>
	defineField({
		name: 'variants',
		type: 'array',
		title: 'Varianter',
		of: [variant()],
	});

const variant = () =>
	defineField({
		name: 'tyreVariant',
		type: 'object',
		title: 'Variant',
		fields: [
			id(),
			season(),
			spiked(),
			dimensions(),
			inStock(),
			price(),
			speedIndex(),
			loadIndex(),
			campaignDiscount(),
			active(),
		],
		preview: {
			select: {
				width: 'dimensions.width',
				profile: 'dimensions.profile',
				diameter: 'dimensions.diameter',
				active: 'active',
				id: 'id',
			},
			prepare: (select) => ({
				title: `${select.width}/${select.profile}x${select.diameter}${
					select.active ? '' : ' [INAKTIV]'
				}`,
				subtitle: select.id,
			}),
		},
	});

const id = () =>
	defineField({
		name: 'id',
		type: 'string',
		title: 'ID',
		validation: (Rule) => Rule.required(),
	});

const season = () =>
	defineField({
		name: 'season',
		type: 'string',
		title: 'Sesong',
		options: {
			list: [
				{title: 'Sommer', value: 'summer'},
				{title: 'Vinter', value: 'winter'},
			],
		},
		validation: (Rule) => Rule.required(),
	});

const spiked = () =>
	defineField({
		name: 'spiked',
		type: 'string',
		title: 'Pigg eller piggfritt',
		options: {
			list: [
				{title: 'Piggdekk', value: 'spiked'},
				{title: 'Piggfri dekk', value: 'spikeless'},
			],
		},
		hidden: ({parent}) => parent?.season !== 'winter',
		validation: (Rule) => Rule.required(),
	});

const dimensions = () =>
	defineField({
		name: 'dimensions',
		type: 'object',
		title: 'Dimensjoner',
		fields: [width(), profile(), diameter()],
	});

const width = () =>
	defineField({
		name: 'width',
		type: 'number',
		title: 'Bredde',
		validation: (Rule) => Rule.required(),
	});

const profile = () =>
	defineField({
		name: 'profile',
		type: 'number',
		title: 'Profil',
		validation: (Rule) => Rule.required(),
	});

const diameter = () =>
	defineField({
		name: 'diameter',
		type: 'number',
		title: 'Diameter',
		validation: (Rule) => Rule.required(),
	});

const inStock = () =>
	defineField({
		name: 'inStock',
		type: 'boolean',
		title: 'På lager',
		validation: (Rule) => Rule.required(),
	});

const price = () =>
	defineField({
		name: 'price',
		type: 'number',
		title: 'Pris',
		validation: (Rule) => Rule.required(),
	});

const speedIndex = () =>
	defineField({
		name: 'speedIndex',
		type: 'string',
		title: 'Hastighetsindeks',
		validation: (Rule) => Rule.required(),
	});

const loadIndex = () =>
	defineField({
		name: 'loadIndex',
		type: 'number',
		title: 'Lastindeks',
		validation: (Rule) => Rule.required(),
	});

const campaignDiscount = () =>
	defineField({
		name: 'campaignDiscount',
		type: 'number',
		title: 'Kampanjerabatt',
	});

const active = () =>
	defineField({
		name: 'active',
		type: 'boolean',
		title: 'Aktiv',
		validation: (Rule) => Rule.required(),
	});

describe('tyre', () => {
	it('schema', async () => {
		const sanitySchema = tyre();
		const output = toOutput(sanitySchema);

		expectTypeOf(output._type).toEqualTypeOf<TyreTest['_type']>();
		expectTypeOf(output.active).toEqualTypeOf<TyreTest['active']>();
		expectTypeOf(output.brand).toEqualTypeOf<TyreTest['brand']>();
		expectTypeOf(output.description).toEqualTypeOf<TyreTest['description']>();
		expectTypeOf(output.model).toEqualTypeOf<TyreTest['model']>();
		expectTypeOf(output.type).toEqualTypeOf<TyreTest['type']>();
		expectTypeOf(output.variants).toEqualTypeOf<TyreTest['variants']>();
		expectTypeOf(output).toEqualTypeOf<TyreTest>();
		expectType<typeof output._type>().toStrictEqual<TyreTest['_type']>();
		expectType<typeof output.active>().toStrictEqual<TyreTest['active']>();
		expectType<typeof output.brand>().toStrictEqual<TyreTest['brand']>();
		expectType<typeof output.description>().toStrictEqual<TyreTest['description']>();
		expectType<typeof output.model>().toStrictEqual<TyreTest['model']>();
		expectType<typeof output.type>().toStrictEqual<TyreTest['type']>();
		expectType<typeof output.variants>().toStrictEqual<TyreTest['variants']>();
		expectType<typeof output>().toStrictEqual<TyreTest>();
	});
});

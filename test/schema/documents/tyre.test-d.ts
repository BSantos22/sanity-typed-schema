import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
import {BULLET, LINK, STRONG, portableText} from 'test/schema/primitives/portable-text.test-d';
import {NUMBERED} from 'test/schema/primitives/portable-text.test-d';
import {EMPHASIS} from 'test/schema/primitives/portable-text.test-d';
import type {TyreTest} from 'test/types/documents/tyre';
import {describe, expectTypeOf, it} from 'vitest';

export const tyre = () =>
	fragmentType({
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
	fragmentField({
		name: 'brand',
		type: 'reference',
		title: 'Leverandør',
		to: [{type: 'supplier'}],
		validation: (Rule) => Rule.required(),
	});

const model = () =>
	fragmentField({
		name: 'model',
		type: 'string',
		title: 'Modell',
		validation: (Rule) => Rule.required(),
	});

const type = () =>
	fragmentField({
		name: 'type',
		type: 'string',
		title: 'Type',
		validation: (Rule) => Rule.required(),
	});

const description = () =>
	fragmentField({
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
	fragmentField({
		name: 'variants',
		type: 'array',
		title: 'Varianter',
		of: [variant()],
	});

const variant = () =>
	fragmentField({
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
	fragmentField({
		name: 'id',
		type: 'string',
		title: 'ID',
		validation: (Rule) => Rule.required(),
	});

const season = () =>
	fragmentField({
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
	fragmentField({
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
	fragmentField({
		name: 'dimensions',
		type: 'object',
		title: 'Dimensjoner',
		fields: [width(), profile(), diameter()],
	});

const width = () =>
	fragmentField({
		name: 'width',
		type: 'number',
		title: 'Bredde',
		validation: (Rule) => Rule.required(),
	});

const profile = () =>
	fragmentField({
		name: 'profile',
		type: 'number',
		title: 'Profil',
		validation: (Rule) => Rule.required(),
	});

const diameter = () =>
	fragmentField({
		name: 'diameter',
		type: 'number',
		title: 'Diameter',
		validation: (Rule) => Rule.required(),
	});

const inStock = () =>
	fragmentField({
		name: 'inStock',
		type: 'boolean',
		title: 'På lager',
		validation: (Rule) => Rule.required(),
	});

const price = () =>
	fragmentField({
		name: 'price',
		type: 'number',
		title: 'Pris',
		validation: (Rule) => Rule.required(),
	});

const speedIndex = () =>
	fragmentField({
		name: 'speedIndex',
		type: 'string',
		title: 'Hastighetsindeks',
		validation: (Rule) => Rule.required(),
	});

const loadIndex = () =>
	fragmentField({
		name: 'loadIndex',
		type: 'number',
		title: 'Lastindeks',
		validation: (Rule) => Rule.required(),
	});

const campaignDiscount = () =>
	fragmentField({
		name: 'campaignDiscount',
		type: 'number',
		title: 'Kampanjerabatt',
	});

const active = () =>
	fragmentField({
		name: 'active',
		type: 'boolean',
		title: 'Aktiv',
		validation: (Rule) => Rule.required(),
	});

describe('tyre', () => {
	it('schema', async () => {
		const sanitySchema = tyre();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<TyreTest>();
	});
});

import {toOutput} from 'src/convert';
import {defineField, defineType} from 'src/schema';
import {
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	FOOTNOTE,
	LINK,
	NUMBERED,
	PRICE,
	STRONG,
	portableText,
} from 'test/schema/primitives/portable-text.test-d';
import type {ServiceTest} from 'test/schema/documents/service';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const service = () =>
	defineType({
		name: 'service',
		type: 'document',
		title: 'Tjeneste',
		fields: [
			name(),
			description(),
			packages(),
			individualPrices(),
			addons(),
			extraInformation(),
		],
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
	defineField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const description = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION],
			lists: [],
			styles: [],
		}),
		name: 'description',
		title: 'Beskrivelse',
	});

const packages = () =>
	defineField({
		name: 'packages',
		type: 'array',
		title: 'Pakker',
		of: [
			{
				name: 'package',
				type: 'object',
				fields: [packageName(), packageDescription(), packagePrice()],
			},
		],
	});

const packageName = () =>
	defineField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const packageDescription = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			lists: [BULLET, NUMBERED],
			customTypes: [],
			styles: [],
		}),
		name: 'description',
		title: 'Beskrivelse',
	});

const packagePrice = () =>
	defineField({
		...portableText({
			decorators: [PRICE, STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
			annotations: [],
		}),
		name: 'price',
		title: 'Pris',
	});

const individualPrices = () =>
	defineField({
		name: 'individualPrices',
		title: 'Enkeltpriser',
		type: 'array',
		of: [
			{
				name: 'individualPrice',
				type: 'object',
				fields: [individualPricesDescription(), individualPricesPrice()],
			},
		],
	});

const individualPricesDescription = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
		}),
		name: 'description',
		title: 'Beskrivelse',
		validation: (Rule) => Rule.required(),
	});

const individualPricesPrice = () =>
	defineField({
		...portableText({
			decorators: [PRICE, STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
			annotations: [],
		}),
		name: 'price',
		title: 'Pris',
	});

const addons = () =>
	defineField({
		name: 'addons',
		type: 'array',
		of: [
			{
				name: 'addon',
				type: 'object',
				fields: [addonDescription(), addonPrice()],
			},
		],
	});

const addonDescription = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
		}),
		name: 'description',
		title: 'Beskrivelse',
		validation: (Rule) => Rule.required(),
	});

const addonPrice = () =>
	defineField({
		...portableText({
			decorators: [PRICE, STRONG, EMPHASIS],
			customTypes: [],
			lists: [],
			styles: [],
			annotations: [],
		}),
		name: 'price',
		title: 'Pris',
	});

const extraInformation = () =>
	defineField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
			styles: [FOOTNOTE],
			customTypes: [],
			lists: [],
		}),
		name: 'extraInformation',
		title: 'Ekstra informasjon',
	});

describe('service', () => {
	it('schema', async () => {
		const sanitySchema = service();
		const output = toOutput(sanitySchema);

		expectTypeOf(output._type).toEqualTypeOf<ServiceTest['_type']>();
		expectTypeOf(output.name).toEqualTypeOf<ServiceTest['name']>();
		expectTypeOf(output.description).toEqualTypeOf<ServiceTest['description']>();
		expectTypeOf(output.packages).toEqualTypeOf<ServiceTest['packages']>();
		expectTypeOf(output.individualPrices).toEqualTypeOf<ServiceTest['individualPrices']>();
		expectTypeOf(output.addons).toEqualTypeOf<ServiceTest['addons']>();
		expectTypeOf(output.extraInformation).toEqualTypeOf<ServiceTest['extraInformation']>();
		expectTypeOf(output).toEqualTypeOf<ServiceTest>();
		expectType<typeof output._type>().toStrictEqual<ServiceTest['_type']>();
		expectType<typeof output.name>().toStrictEqual<ServiceTest['name']>();
		expectType<typeof output.description>().toStrictEqual<ServiceTest['description']>();
		expectType<typeof output.packages>().toStrictEqual<ServiceTest['packages']>();
		expectType<typeof output.individualPrices>().toStrictEqual<
			ServiceTest['individualPrices']
		>();
		expectType<typeof output.addons>().toStrictEqual<ServiceTest['addons']>();
		expectType<typeof output.extraInformation>().toStrictEqual<
			ServiceTest['extraInformation']
		>();
		expectType<typeof output>().toStrictEqual<ServiceTest>();
	});
});

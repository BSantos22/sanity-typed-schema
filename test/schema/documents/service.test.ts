import type {PortableTextBlock} from '@portabletext/types';
import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
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
} from 'test/schema/primitives/portable-text.test';
import type {SetOptional} from 'type-fest';
import {describe, expectTypeOf, it} from 'vitest';

export const service = () =>
	fragmentType({
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
	fragmentField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const description = () =>
	fragmentField({
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
	fragmentField({
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
	fragmentField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const packageDescription = () =>
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
	fragmentField({
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
		type Test = {
			_type: 'service';
			name: string;
			description: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			packages: {
				_type: 'package';
				name: string;
				description: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
				price: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			}[];
			individualPrices: {
				_type: 'individualPrice';
				description: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
				price: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			}[];
			addons: {
				_type: 'addon';
				description: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
				price: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
			}[];
			extraInformation: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
		};

		const sanitySchema = service();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});
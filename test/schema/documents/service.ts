import {fragmentField, fragmentType} from 'src/typing';
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
} from 'test/schema/primitives/portable-text';

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
		}),
		name: 'description',
		title: 'Beskrivelse',
	});

const packagePrice = () =>
	fragmentField({
		...portableText({
			decorators: [PRICE, STRONG, EMPHASIS],
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
		}),
		name: 'description',
		title: 'Beskrivelse',
		validation: (Rule) => Rule.required(),
	});

const individualPricesPrice = () =>
	fragmentField({
		...portableText({
			decorators: [PRICE, STRONG, EMPHASIS],
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
		}),
		name: 'description',
		title: 'Beskrivelse',
		validation: (Rule) => Rule.required(),
	});

const addonPrice = () =>
	fragmentField({
		...portableText({
			decorators: [PRICE, STRONG, EMPHASIS],
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
		}),
		name: 'extraInformation',
		title: 'Ekstra informasjon',
	});

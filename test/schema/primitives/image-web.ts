import {fragmentField} from 'src/typing';

export const ALT_TEXT = Symbol('altText');
export const CAPTION = Symbol('caption');
export const CREDIT = Symbol('credit');
export const WIDTH = Symbol('width');

const fieldDefinitions = {
	[ALT_TEXT]: {name: 'altText', title: 'Alternativ tekst', type: 'string'},
	[CAPTION]: {name: 'caption', title: 'Bildetekst', type: 'string'},
	[CREDIT]: {name: 'credit', title: 'Bildekreditt', type: 'string'},
	[WIDTH]: {name: 'width', title: 'Bredde', type: 'number'},
};

type Field = keyof typeof fieldDefinitions;

export const imageWeb = (args?: {fields?: Field[]}) => {
	const fields = args?.fields?.map((field) => fieldDefinitions[field]) ?? [];
	return fragmentField({
		name: 'image',
		title: 'Bilde',
		type: 'image',
		options: {
			hotspot: true,
		},
		fields,
		preview: {
			select: {
				media: 'asset',
				title: 'altText',
			},
			prepare: (select) => ({
				title: select.title,
				media: select.media,
			}),
		},
	});
};

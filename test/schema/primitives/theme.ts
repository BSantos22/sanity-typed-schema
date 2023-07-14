import {fragmentField} from 'src/schema';

export const theme = () =>
	fragmentField({
		title: 'Tema',
		name: 'theme',
		type: 'string',
		initialValue: 'light',
		options: {
			list: [
				{title: 'Svart', value: 'dark'},
				{title: 'Hvit', value: 'light'},
			],
		},
		validation: (Rule) => Rule.required(),
	});

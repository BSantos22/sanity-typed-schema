import {fragmentField} from 'src/typing';
import {theme} from 'test/schema/primitives/theme';

export const articleListAll = () =>
	fragmentField({
		name: 'articleListAll',
		title: 'Artikkeloversikt',
		type: 'object',
		fields: [title(), theme()],
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

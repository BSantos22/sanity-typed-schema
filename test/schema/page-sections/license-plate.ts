import {fragmentField} from 'src/schema';

export const licensePlate = () =>
	fragmentField({
		name: 'licensePlate',
		title: 'Nummerplater',
		type: 'object',
		fields: [title(), label()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Nummerplater',
			}),
		},
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const label = () =>
	fragmentField({
		name: 'label',
		title: 'Label',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

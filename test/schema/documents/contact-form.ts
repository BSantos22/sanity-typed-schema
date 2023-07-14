import {fragmentField, fragmentType} from 'src/typing';

export const contactForm = () =>
	fragmentType({
		name: 'contactForm',
		type: 'document',
		title: 'Kontaktskjema',
		fields: [type(), data()],
		preview: {
			select: {
				title: 'type',
				subtitle: '_createdAt',
				_id: '_id',
			},
			prepare: (select) => ({
				title: `${select._id} [${select.title}]`,
				subtitle: new Date(select.subtitle).toLocaleDateString(),
			}),
		},
	});

const type = () =>
	fragmentField({
		name: 'type',
		type: 'string',
		title: 'Type',
		readOnly: true,
		validation: (Rule) => Rule.required(),
	});

const data = () =>
	fragmentField({
		name: 'data',
		type: 'string',
		title: 'Data',
		readOnly: true,
		validation: (Rule) => Rule.required(),
	});

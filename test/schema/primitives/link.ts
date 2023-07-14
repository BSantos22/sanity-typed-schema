import {fragmentField} from 'src/schema';

export const link = () => {
	return fragmentField({
		title: 'Lenke',
		name: 'link',
		type: 'object',
		fields: [type(), reference(), query(), href(), targetBlank()],
		preview: {
			select: {
				title: 'reference.title',
				type: 'type',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `Lenke ${select.type === 'internal' ? 'intern' : 'ekstern'}`,
			}),
		},
	});
};

const type = () =>
	fragmentField({
		name: 'type',
		title: 'Type',
		type: 'string',
		initialValue: 'internal',
		options: {
			list: [
				{title: 'Intern', value: 'internal'},
				{title: 'Ekstern', value: 'external'},
			],
		},
		validation: (Rule) => Rule.required(),
	});

const reference = () =>
	fragmentField({
		name: 'reference',
		title: 'Intern lenke',
		type: 'reference',
		to: [{type: 'page'}, {type: 'article'}],
		hidden: ({parent}) => parent?.type !== 'internal',
	});

const query = () =>
	fragmentField({
		name: 'query',
		title: 'Query',
		type: 'string',
		hidden: ({parent}) => parent?.type !== 'internal',
	});

const href = () =>
	fragmentField({
		name: 'href',
		title: 'URL',
		type: 'url',
		validation: (Rule) =>
			Rule.uri({
				allowRelative: true,
				scheme: ['https', 'http', 'mailto', 'tel'],
			}),
		hidden: ({parent}) => parent?.type !== 'external',
	});

const targetBlank = () =>
	fragmentField({
		name: 'targetBlank',
		title: 'Åpne i nytt pane',
		type: 'boolean',
		initialValue: true,
		description: 'Åpne lenken i et nytt nettleservindu',
		validation: (Rule) => Rule.required(),
	});

import {fragmentField} from 'src/typing';

export const videoEmbed = () =>
	fragmentField({
		title: 'Video',
		name: 'video',
		type: 'object',
		fields: [url()],
		preview: {
			select: {
				url: 'url',
			},
			prepare: (selection) => ({
				title: selection.url,
				subtitle: 'Video Embed',
			}),
		},
	});

const url = () =>
	fragmentField({
		name: 'url',
		type: 'url',
		title: 'Video URL',
		validation: (Rule) => Rule.required(),
	});

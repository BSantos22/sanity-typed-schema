import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import {describe, expectTypeOf, it} from 'vitest';

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

describe('video-embed', () => {
	it('schema', async () => {
		type Test = {
			_type: 'video';
			url: string;
		};

		const sanitySchema = videoEmbed();
		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

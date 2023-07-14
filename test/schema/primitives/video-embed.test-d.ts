import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import type {VideoEmbedTest} from 'test/schema/primitives/video-embed';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

export const videoEmbed = () =>
	defineField({
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
	defineField({
		name: 'url',
		type: 'url',
		title: 'Video URL',
		validation: (Rule) => Rule.required(),
	});

describe('video-embed', () => {
	it('schema', async () => {
		const sanitySchema = videoEmbed();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.url).toEqualTypeOf<VideoEmbedTest['url']>();
		expectTypeOf(output).toEqualTypeOf<VideoEmbedTest>();
		expectType<typeof output.url>().toStrictEqual<VideoEmbedTest['url']>();
		expectType<typeof output>().toStrictEqual<VideoEmbedTest>();
	});
});

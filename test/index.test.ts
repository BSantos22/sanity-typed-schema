import {sanityToZod} from 'src/convert';
import {describe, expect, it} from 'vitest';
import {videoEmbed} from './schema/primitives/video-embed';

describe('ts-script-starter', () => {
	it('primitives', async () => {
		const zodSchema = sanityToZod(videoEmbed());
		console.log(zodSchema);
		expect(zodSchema).toEqual(zodSchema);
	});
});

import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('geopoint', () => {
	it('base schema', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'geopoint',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'geopoint';
			lat?: number;
			lng?: number;
			alt?: number;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'geopoint';
			lat?: number;
			lng?: number;
			alt?: number;
		}>();
	});

	it('geopoint does not support option list', async () => {
		// Well, it does, but it doesn't do anything, and therefore does not affect the output type
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'geopoint',
			options: {
				list: [
					{
						value: {
							_type: 'geopoint',
							lat: 1,
							lng: 2,
							alt: 3,
						},
					},
					{
						value: {
							_type: 'geopoint',
							lat: 4,
							lng: 5,
							alt: 6,
						},
					},
				],
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'geopoint';
			lat?: number;
			lng?: number;
			alt?: number;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'geopoint';
			lat?: number;
			lng?: number;
			alt?: number;
		}>();
	});
});

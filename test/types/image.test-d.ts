import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('image', () => {
	it('basic schema', async () => {
		const sanitySchema = fragmentField({
			name: 'photo',
			type: 'image',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
		}>();
	});

	it('image with hotspot', async () => {
		const sanitySchema = fragmentField({
			name: 'photo',
			type: 'image',
			options: {
				hotspot: true,
			},
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			hotspot?: {
				_type: 'sanity.imageHotspot';
				x?: number;
				y?: number;
				height?: number;
				width?: number;
			};
			crop?: {
				_type: 'sanity.imageCrop';
				top?: number;
				bottom?: number;
				left?: number;
				right?: number;
			};
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			hotspot?: {
				_type: 'sanity.imageHotspot';
				x?: number;
				y?: number;
				height?: number;
				width?: number;
			};
			crop?: {
				_type: 'sanity.imageCrop';
				top?: number;
				bottom?: number;
				left?: number;
				right?: number;
			};
		}>();
	});

	it('image with fields', async () => {
		const sanitySchema = fragmentField({
			name: 'photo',
			type: 'image',
			fields: [
				{
					name: 'alt',
					type: 'string',
				},
				{
					name: 'caption',
					type: 'text',
				},
			],
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			alt?: string;
			caption?: string;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			alt?: string;
			caption?: string;
		}>();
	});

	it('image with hotspot and fields', async () => {
		const sanitySchema = fragmentField({
			name: 'photo',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'timeTaken',
					type: 'datetime',
				},
				{
					name: 'numberOfViews',
					type: 'number',
				},
			],
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			hotspot?: {
				_type: 'sanity.imageHotspot';
				x?: number;
				y?: number;
				height?: number;
				width?: number;
			};
			crop?: {
				_type: 'sanity.imageCrop';
				top?: number;
				bottom?: number;
				left?: number;
				right?: number;
			};
			timeTaken?: string;
			numberOfViews?: number;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			hotspot?: {
				_type: 'sanity.imageHotspot';
				x?: number;
				y?: number;
				height?: number;
				width?: number;
			};
			crop?: {
				_type: 'sanity.imageCrop';
				top?: number;
				bottom?: number;
				left?: number;
				right?: number;
			};
			timeTaken?: string;
			numberOfViews?: number;
		}>();
	});

	it('basic with hotspot and complex fields', async () => {
		const sanitySchema = fragmentField({
			name: 'photo',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'timeTaken',
					type: 'datetime',
				},
				{
					name: 'numberOfViews',
					type: 'number',
				},
				{
					name: 'alt',
					type: 'string',
				},
				{
					name: 'caption',
					type: 'text',
				},
				{
					name: 'extraInformation',
					type: 'object',
					fields: [
						{
							name: 'extraField',
							type: 'string',
						},
						{
							name: 'city',
							type: 'object',
							fields: [
								{
									name: 'name',
									type: 'string',
								},
								{
									name: 'location',
									type: 'geopoint',
								},
							],
						},
						{
							name: 'alternativeImage',
							type: 'image',
							options: {
								hotspot: true,
							},
							fields: [
								{
									name: 'alt',
									type: 'string',
								},
							],
						},
					],
				},
			],
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			hotspot?: {
				_type: 'sanity.imageHotspot';
				x?: number;
				y?: number;
				height?: number;
				width?: number;
			};
			crop?: {
				_type: 'sanity.imageCrop';
				top?: number;
				bottom?: number;
				left?: number;
				right?: number;
			};
			timeTaken?: string;
			numberOfViews?: number;
			alt?: string;
			caption?: string;
			extraInformation?: {
				extraField?: string;
				city?: {
					name?: string;
					location?: {
						_type: 'geopoint';
						lat?: number;
						lng?: number;
						alt?: number;
					};
				};
				alternativeImage?: {
					_type: 'image';
					asset?: {
						_type: 'reference';
						_ref: string;
					};
					hotspot?: {
						_type: 'sanity.imageHotspot';
						x?: number;
						y?: number;
						height?: number;
						width?: number;
					};
					crop?: {
						_type: 'sanity.imageCrop';
						top?: number;
						bottom?: number;
						left?: number;
						right?: number;
					};
					alt?: string;
				};
			};
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'image';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			hotspot?: {
				_type: 'sanity.imageHotspot';
				x?: number;
				y?: number;
				height?: number;
				width?: number;
			};
			crop?: {
				_type: 'sanity.imageCrop';
				top?: number;
				bottom?: number;
				left?: number;
				right?: number;
			};
			timeTaken?: string;
			numberOfViews?: number;
			alt?: string;
			caption?: string;
			extraInformation?: {
				extraField?: string;
				city?: {
					name?: string;
					location?: {
						_type: 'geopoint';
						lat?: number;
						lng?: number;
						alt?: number;
					};
				};
				alternativeImage?: {
					_type: 'image';
					asset?: {
						_type: 'reference';
						_ref: string;
					};
					hotspot?: {
						_type: 'sanity.imageHotspot';
						x?: number;
						y?: number;
						height?: number;
						width?: number;
					};
					crop?: {
						_type: 'sanity.imageCrop';
						top?: number;
						bottom?: number;
						left?: number;
						right?: number;
					};
					alt?: string;
				};
			};
		}>();
	});
});

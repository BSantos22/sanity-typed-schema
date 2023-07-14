import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('file', () => {
	it('basic schema', async () => {
		const sanitySchema = fragmentField({
			name: 'pdf',
			type: 'file',
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'file';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'file';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
		}>();
	});

	it('file with fields', async () => {
		const sanitySchema = fragmentField({
			name: 'pdf',
			type: 'file',
			fields: [
				{
					name: 'description',
					type: 'string',
				},
				{
					name: 'title',
					type: 'text',
				},
			],
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'file';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			title?: string;
			description?: string;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'file';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			title?: string;
			description?: string;
		}>();
	});

	it('file with complex fields', async () => {
		const sanitySchema = fragmentField({
			name: 'photo',
			type: 'file',
			fields: [
				{
					name: 'lastEdited',
					type: 'datetime',
				},
				{
					name: 'numberOfViews',
					type: 'number',
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
							name: 'thumbnail',
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
			_type: 'file';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			lastEdited?: string;
			numberOfViews?: number;
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
				thumbnail?: {
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
			_type: 'file';
			asset?: {
				_type: 'reference';
				_ref: string;
			};
			lastEdited?: string;
			numberOfViews?: number;
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
				thumbnail?: {
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

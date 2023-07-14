import type {
	ArbitraryTypedObject,
	PortableTextMarkDefinition,
	PortableTextSpan,
} from '@portabletext/types';
import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('array', () => {
	describe('block', () => {
		it('block array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'block'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'block';
					_key: string;
					markDefs?: PortableTextMarkDefinition[];
					style?: string;
					listItem?: string;
					level?: number;
					children?: (ArbitraryTypedObject | PortableTextSpan)[] | undefined;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'block';
					_key: string;
					markDefs?: PortableTextMarkDefinition[];
					style?: string;
					listItem?: string;
					level?: number;
					children?: (ArbitraryTypedObject | PortableTextSpan)[] | undefined;
				}[]
			>();
		});

		it('block array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'block'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('block array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'block'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('boolean', () => {
		it('boolean array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'boolean'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<boolean[]>();
			expectType<typeof output>().toStrictEqual<boolean[]>();
		});

		it('boolean array with value options', async () => {
			const sanitySchema = fragmentField({
				name: 'boolean',
				type: 'array',
				of: [{type: 'boolean'}],
				options: {
					list: [true],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<true[]>();
			expectType<typeof output>().toStrictEqual<true[]>();
		});

		it('boolean array with object options', async () => {
			const sanitySchema = fragmentField({
				name: 'boolean',
				type: 'array',
				of: [{type: 'boolean'}],
				options: {
					list: [
						{
							title: 'Accepted',
							value: true,
						},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<true[]>();
			expectType<typeof output>().toStrictEqual<true[]>();
		});
	});

	describe('date', () => {
		it('date array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'date'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<string[]>();
			expectType<typeof output>().toStrictEqual<string[]>();
		});

		it('date array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'date'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('date array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'date'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('datetime', () => {
		it('datetime array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'datetime'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<string[]>();
			expectType<typeof output>().toStrictEqual<string[]>();
		});

		it('datetime array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'datetime'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('datetime array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'datetime'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('document', () => {
		it('object with a document field', async () => {
			// Is this a thing?
			// I feel like this shouldn't be a thing, but it works
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [
					{
						name: 'doc',
						type: 'document',
						fields: [
							{
								name: 'text',
								type: 'string',
							},
						],
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'doc';
					_key: string;
					text?: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'doc';
					_key: string;
					text?: string;
				}[]
			>();
		});
	});

	describe('email', () => {
		it('email array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'email'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<string[]>();
			expectType<typeof output>().toStrictEqual<string[]>();
		});

		it('email array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'email'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('email array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'email'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('file', () => {
		it('file array', async () => {
			const sanitySchema = fragmentField({
				name: 'pdf',
				type: 'array',
				of: [{type: 'file'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'file';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'file';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
				}[]
			>();
		});

		it('file array with fields', async () => {
			const sanitySchema = fragmentField({
				name: 'pdfs',
				type: 'array',
				of: [
					{
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
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'pdf';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
					title?: string;
					description?: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'pdf';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
					title?: string;
					description?: string;
				}[]
			>();
		});

		it('file with complex fields', async () => {
			const sanitySchema = fragmentField({
				name: 'pdfs',
				type: 'array',
				of: [
					{
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
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
		});
	});

	describe('geopoint', () => {
		it('geopoint array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'geopoint'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_key: string;
					_type: 'geopoint';
					lat?: number;
					lng?: number;
					alt?: number;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_key: string;
					_type: 'geopoint';
					lat?: number;
					lng?: number;
					alt?: number;
				}[]
			>();
		});

		it('geopoint array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'geopoint'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('geopoint array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'geopoint'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('image', () => {
		it('image array', async () => {
			const sanitySchema = fragmentField({
				name: 'photos',
				type: 'array',
				of: [
					{
						name: 'photo',
						type: 'image',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'photo';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'photo';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
				}[]
			>();
		});

		it('image array without name', async () => {
			const sanitySchema = fragmentField({
				name: 'photos',
				type: 'array',
				of: [
					{
						type: 'image',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'image';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'image';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
				}[]
			>();
		});

		it('image with hotspot', async () => {
			const sanitySchema = fragmentField({
				name: 'photos',
				type: 'array',
				of: [
					{
						name: 'photo',
						type: 'image',
						options: {
							hotspot: true,
						},
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
		});

		it('image with fields', async () => {
			const sanitySchema = fragmentField({
				name: 'photos',
				type: 'array',
				of: [
					{
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
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'photo';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
					alt?: string;
					caption?: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'photo';
					_key: string;
					asset?: {
						_type: 'reference';
						_ref: string;
					};
					alt?: string;
					caption?: string;
				}[]
			>();
		});

		it('image with hotspot and fields', async () => {
			const sanitySchema = fragmentField({
				name: 'photos',
				type: 'array',
				of: [
					{
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
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
		});

		it('basic with hotspot and complex fields', async () => {
			const sanitySchema = fragmentField({
				name: 'photos',
				type: 'array',
				of: [
					{
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
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'photo';
					_key: string;
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
				}[]
			>();
		});
	});

	describe('number', () => {
		it('number array', async () => {
			const sanitySchema = fragmentField({
				name: 'number',
				type: 'array',
				of: [{type: 'number'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<number[]>();
			expectType<typeof output>().toStrictEqual<number[]>();
		});

		it('number array with value options', async () => {
			const sanitySchema = fragmentField({
				name: 'number',
				type: 'array',
				of: [{type: 'number'}],
				options: {
					list: [1, 2],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<(1 | 2)[]>();
			expectType<typeof output>().toStrictEqual<(1 | 2)[]>();
		});

		it('number array with object options', async () => {
			const sanitySchema = fragmentField({
				name: 'number',
				type: 'array',
				of: [{type: 'number'}],
				options: {
					list: [
						{
							title: 'Duck',
							value: 3,
						},
						{
							title: 'Goose',
							value: 6,
						},
						{
							title: 'Swan',
							value: 9,
						},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<(3 | 6 | 9)[]>();
			expectType<typeof output>().toStrictEqual<(3 | 6 | 9)[]>();
		});
	});

	describe('object', () => {
		it('array of nested objects', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [
					{
						name: 'nested',
						type: 'object',
						fields: [
							{
								name: 'text',
								type: 'string',
							},
						],
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'nested';
					_key: string;
					text?: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'nested';
					_key: string;
					text?: string;
				}[]
			>();
		});

		it('array of nested objects without a name', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [
					{
						type: 'object',
						fields: [
							{
								name: 'text',
								type: 'string',
							},
						],
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_key: string;
					text?: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_key: string;
					text?: string;
				}[]
			>();
		});

		it('object with 20 levels of nesting', async () => {
			// Maybe 20 is overkill to test this, but it works
			// Good luck to whoever has to deal with 20 levels of nesting
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [
					{
						name: 'level1',
						type: 'object',
						fields: [
							{
								name: 'level2',
								type: 'object',
								fields: [
									{
										name: 'level3',
										type: 'object',
										fields: [
											{
												name: 'level4',
												type: 'object',
												fields: [
													{
														name: 'level5',
														type: 'object',
														fields: [
															{
																name: 'level6',
																type: 'object',
																fields: [
																	{
																		name: 'level7',
																		type: 'object',
																		fields: [
																			{
																				name: 'level8',
																				type: 'object',
																				fields: [
																					{
																						name: 'level9',
																						type: 'object',
																						fields: [
																							{
																								name: 'level10',
																								type: 'object',
																								fields: [
																									{
																										name: 'level11',
																										type: 'object',
																										fields: [
																											{
																												name: 'level12',
																												type: 'object',
																												fields: [
																													{
																														name: 'level13',
																														type: 'object',
																														fields: [
																															{
																																name: 'level14',
																																type: 'object',
																																fields: [
																																	{
																																		name: 'level15',
																																		type: 'object',
																																		fields: [
																																			{
																																				name: 'level16',
																																				type: 'object',
																																				fields: [
																																					{
																																						name: 'level17',
																																						type: 'object',
																																						fields: [
																																							{
																																								name: 'level18',
																																								type: 'object',
																																								fields: [
																																									{
																																										name: 'level19',
																																										type: 'object',
																																										fields: [
																																											{
																																												name: 'level20',
																																												type: 'object',
																																												fields: [
																																													{
																																														name: 'text',
																																														type: 'string',
																																													},
																																												],
																																											},
																																										],
																																									},
																																								],
																																							},
																																						],
																																					},
																																				],
																																			},
																																		],
																																	},
																																],
																															},
																														],
																													},
																												],
																											},
																										],
																									},
																								],
																							},
																						],
																					},
																				],
																			},
																		],
																	},
																],
															},
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_type: 'level1';
					_key: string;
					level2?: {
						level3?: {
							level4?: {
								level5?: {
									level6?: {
										level7?: {
											level8?: {
												level9?: {
													level10?: {
														level11?: {
															level12?: {
																level13?: {
																	level14?: {
																		level15?: {
																			level16?: {
																				level17?: {
																					level18?: {
																						level19?: {
																							level20?: {
																								text?: string;
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_type: 'level1';
					_key: string;
					level2?: {
						level3?: {
							level4?: {
								level5?: {
									level6?: {
										level7?: {
											level8?: {
												level9?: {
													level10?: {
														level11?: {
															level12?: {
																level13?: {
																	level14?: {
																		level15?: {
																			level16?: {
																				level17?: {
																					level18?: {
																						level19?: {
																							level20?: {
																								text?: string;
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				}[]
			>();
			// Find Wally for the missing question mark
			expectType<typeof output>().not.toStrictEqual<
				{
					_type: 'level1';
					_key: string;
					level2?: {
						level3?: {
							level4?: {
								level5?: {
									level6?: {
										level7?: {
											level8?: {
												level9?: {
													level10?: {
														level11: {
															level12?: {
																level13?: {
																	level14?: {
																		level15?: {
																			level16?: {
																				level17?: {
																					level18?: {
																						level19?: {
																							level20?: {
																								text?: string;
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				}[]
			>();
		});
	});

	describe('reference', () => {
		it('reference array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'reference'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_key: string;
					_type: 'reference';
					_ref: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_key: string;
					_type: 'reference';
					_ref: string;
				}[]
			>();
		});

		it('reference array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'reference'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('reference array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'reference'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('slug', () => {
		it('slug array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'slug'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				{
					_key: string;
					_type: 'slug';
					current?: string;
				}[]
			>();
			expectType<typeof output>().toStrictEqual<
				{
					_key: string;
					_type: 'slug';
					current?: string;
				}[]
			>();
		});

		it('slug array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'slug'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('slug array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'slug'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('string', () => {
		it('string array', async () => {
			const sanitySchema = fragmentField({
				name: 'string',
				type: 'array',
				of: [{type: 'string'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<string[]>();
			expectType<typeof output>().toStrictEqual<string[]>();
		});

		it('string array with value options', async () => {
			const sanitySchema = fragmentField({
				name: 'string',
				type: 'array',
				of: [{type: 'string'}],
				options: {
					list: ['test1', 'test2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('test1' | 'test2')[]>();
			expectType<typeof output>().toStrictEqual<('test1' | 'test2')[]>();
		});

		it('string array with object options', async () => {
			const sanitySchema = fragmentField({
				name: 'string',
				type: 'array',
				of: [{type: 'string'}],
				options: {
					list: [
						{
							title: 'Duck',
							value: 'duck',
						},
						{
							title: 'Goose',
							value: 'goose',
						},
						{
							title: 'Swan',
							value: 'swan',
						},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('duck' | 'goose' | 'swan')[]>();
			expectType<typeof output>().toStrictEqual<('duck' | 'goose' | 'swan')[]>();
		});
	});

	describe('text', () => {
		it('text array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'text'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<string[]>();
			expectType<typeof output>().toStrictEqual<string[]>();
		});

		it('text array with value options', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'text'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('text array with object options', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'text'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('url', () => {
		it('url array', async () => {
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'url'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<string[]>();
			expectType<typeof output>().toStrictEqual<string[]>();
		});

		it('url array with value options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'url'}],
				options: {
					list: ['logTest1', 'longTest2'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});

		it('url array with object options', async () => {
			// This actually doesn't work on the Sanity side of things, because
			// the url type doesn't support options.
			// But this is how it should probably work.
			// This is ok behaviour because the value is always going to be [],
			// which fulfills the type requirements of ('logTest1' | 'longTest2')[]
			const sanitySchema = fragmentField({
				name: 'test',
				type: 'array',
				of: [{type: 'url'}],
				options: {
					list: [
						{
							title: 'Log1',
							value: 'logTest1',
						},
						{value: 'longTest2'},
					],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<('logTest1' | 'longTest2')[]>();
			expectType<typeof output>().toStrictEqual<('logTest1' | 'longTest2')[]>();
		});
	});

	describe('mixed primitive types', () => {
		it('array of multiple primitive fields', async () => {
			const sanitySchema = fragmentField({
				name: 'string',
				type: 'array',
				of: [{type: 'string'}, {type: 'number'}, {type: 'boolean'}, {type: 'date'}],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<(string | number | boolean)[]>();
			expectType<typeof output>().toStrictEqual<(string | number | boolean)[]>();
		});

		it('array of multiple primitive fields with value options', async () => {
			const sanitySchema = fragmentField({
				name: 'string',
				type: 'array',
				of: [{type: 'string'}, {type: 'number'}, {type: 'boolean'}, {type: 'date'}],
				options: {
					list: ['test1', 'test2', 1, 2, true, false, '2021-01-01'],
				},
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<
				('test1' | 'test2' | 1 | 2 | true | false | '2021-01-01')[]
			>();
			expectType<typeof output>().toStrictEqual<
				('test1' | 'test2' | 1 | 2 | true | false | '2021-01-01')[]
			>();
		});

		it('array of multiple primitive fields with object options', async () => {
			const sanitySchema = fragmentField({
				name: 'string',
				type: 'array',
				of: [{type: 'string'}, {type: 'number'}, {type: 'boolean'}, {type: 'date'}],
				options: {
					list: [
						{
							title: 'Duck',
							value: 'duck',
						},
						{
							title: 'Goose',
							value: 'goose',
						},
						{
							title: 'Swan',
							value: 'swan',
						},
						{
							title: 'One',
							value: 1,
						},
						{
							title: 'Two',
							value: 2,
						},
						{
							title: 'True',
							value: true,
						},
						{
							title: 'False',
							value: false,
						},
						{
							title: 'Date',
							value: '2021-01-01',
						},
					],
				},
			});
			const output = toOutput(sanitySchema);

			expectTypeOf(output).toEqualTypeOf<
				('duck' | 'goose' | 'swan' | 1 | 2 | true | false | '2021-01-01')[]
			>();
			expectType<typeof output>().toStrictEqual<
				('duck' | 'goose' | 'swan' | 1 | 2 | true | false | '2021-01-01')[]
			>();
		});
	});

	describe('mixed complex types', () => {
		it('array of files, images and a custom type', async () => {
			it('file array with fields', async () => {
				const sanitySchema = fragmentField({
					name: 'attachments',
					type: 'array',
					of: [
						{
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
						},
						{
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
						},
						{
							name: 'nested',
							type: 'object',
							fields: [
								{
									name: 'text',
									type: 'string',
								},
							],
						},
						{
							type: 'object',
							fields: [
								{
									name: 'text',
									type: 'string',
								},
							],
						},
						{
							type: 'image',
							options: {
								hotspot: true,
							},
							fields: [
								{
									name: 'differentField',
									type: 'url',
								},
							],
						},
					],
				});
				const output = toOutput(sanitySchema);
				expectTypeOf(output).toEqualTypeOf<
					(
						| {
								_type: 'pdf';
								_key: string;
								asset?: {
									_type: 'reference';
									_ref: string;
								};
								title?: string;
								description?: string;
						  }
						| {
								_type: 'photo';
								_key: string;
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
						  }
						| {
								_type: 'nested';
								_key: string;
								text?: string;
						  }
						| {
								_key: string;
								text?: string;
						  }
						| {
								_type: 'image';
								_key: string;
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
								differentField?: string;
						  }
					)[]
				>();
				expectType<typeof output>().toStrictEqual<
					(
						| {
								_type: 'pdf';
								_key: string;
								asset?: {
									_type: 'reference';
									_ref: string;
								};
								title?: string;
								description?: string;
						  }
						| {
								_type: 'photo';
								_key: string;
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
						  }
						| {
								_type: 'nested';
								_key: string;
								text?: string;
						  }
						| {
								_key: string;
								text?: string;
						  }
						| {
								_type: 'image';
								_key: string;
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
								differentField?: string;
						  }
					)[]
				>();
			});
		});
	});
});

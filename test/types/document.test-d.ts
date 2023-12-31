import type {
	ArbitraryTypedObject,
	PortableTextMarkDefinition,
	PortableTextSpan,
} from '@portabletext/types';
import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('document', () => {
	describe('simple types', () => {
		it('document with a block field', async () => {
			const sanitySchema = defineField({
				name: 'block',
				type: 'document',
				fields: [
					{
						name: 'text',
						type: 'block',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'block';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				text?: {
					_type: 'block';
					_key?: string;
					markDefs?: PortableTextMarkDefinition[];
					style?: string;
					listItem?: string;
					level?: number;
					children?: (ArbitraryTypedObject | PortableTextSpan)[] | undefined;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'block';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				text?: {
					_type: 'block';
					_key?: string;
					markDefs?: PortableTextMarkDefinition[];
					style?: string;
					listItem?: string;
					level?: number;
					children?: (ArbitraryTypedObject | PortableTextSpan)[] | undefined;
				};
			}>();
		});

		it('document with a boolean field', async () => {
			const sanitySchema = defineField({
				name: 'boolean',
				type: 'document',
				fields: [
					{
						name: 'isTrue',
						type: 'boolean',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'boolean';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				isTrue?: boolean;
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'boolean';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				isTrue?: boolean;
			}>();
		});

		it('document with a date field', async () => {
			const sanitySchema = defineField({
				name: 'date',
				type: 'document',
				fields: [
					{
						name: 'when',
						type: 'date',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'date';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				when?: string;
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'date';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				when?: string;
			}>();
		});

		it('document with a datetime field', async () => {
			const sanitySchema = defineField({
				name: 'datetime',
				type: 'document',
				fields: [
					{
						name: 'when',
						type: 'datetime',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'datetime';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				when?: string;
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'datetime';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				when?: string;
			}>();
		});

		it('document with an email field', async () => {
			const sanitySchema = defineField({
				name: 'email',
				type: 'document',
				fields: [
					{
						name: 'where',
						type: 'email',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'email';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				where?: string;
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'email';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				where?: string;
			}>();
		});

		it('document with a geopoint field', async () => {
			const sanitySchema = defineField({
				name: 'geopoint',
				type: 'document',
				fields: [
					{
						name: 'where',
						type: 'geopoint',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'geopoint';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				where?: {
					_type: 'geopoint';
					lat?: number;
					lng?: number;
					alt?: number;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'geopoint';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				where?: {
					_type: 'geopoint';
					lat?: number;
					lng?: number;
					alt?: number;
				};
			}>();
		});

		it('document with a number field', async () => {
			const sanitySchema = defineField({
				name: 'numbers',
				type: 'document',
				fields: [
					{
						name: 'count',
						type: 'number',
					},
					{
						name: 'options',
						type: 'number',
						options: {
							list: [1, 2, 3, 4, 5],
						},
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'numbers';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				count?: number;
				options?: 1 | 2 | 3 | 4 | 5;
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'numbers';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				count?: number;
				options?: 1 | 2 | 3 | 4 | 5;
			}>();
		});

		it('document with a reference field', async () => {
			const sanitySchema = defineField({
				name: 'reference',
				type: 'document',
				fields: [
					{
						name: 'ref',
						type: 'reference',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'reference';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				ref?: {
					_type: 'reference';
					_ref: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'reference';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				ref?: {
					_type: 'reference';
					_ref: string;
				};
			}>();
		});

		it('document with a slug field', async () => {
			const sanitySchema = defineField({
				name: 'gail',
				type: 'document',
				fields: [
					{
						name: 'sluggySlug',
						type: 'slug',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'gail';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				sluggySlug?: {
					_type: 'slug';
					current?: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'gail';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				sluggySlug?: {
					_type: 'slug';
					current?: string;
				};
			}>();
		});

		it('document with a string field', async () => {
			const sanitySchema = defineField({
				name: 'strings',
				type: 'document',
				fields: [
					{
						name: 'text',
						type: 'string',
					},
					{
						name: 'options',
						type: 'string',
						options: {
							list: ['test1', 'test2'],
						},
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'strings';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				text?: string;
				options?: 'test1' | 'test2';
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'strings';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				text?: string;
				options?: 'test1' | 'test2';
			}>();
		});

		it('document with a text field', async () => {
			const sanitySchema = defineField({
				name: 'text',
				type: 'document',
				fields: [
					{
						name: 'longText',
						type: 'text',
					},
					{
						name: 'options',
						type: 'text',
						options: {
							list: ['logTest1', 'longTest2'],
						},
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'text';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				longText?: string;
				options?: 'logTest1' | 'longTest2';
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'text';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				longText?: string;
				options?: 'logTest1' | 'longTest2';
			}>();
		});

		it('document with a url field', async () => {
			const sanitySchema = defineField({
				name: 'url',
				type: 'document',
				fields: [
					{
						name: 'uniformResourceLocator',
						type: 'url',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'url';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				uniformResourceLocator?: string;
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'url';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				uniformResourceLocator?: string;
			}>();
		});
	});

	describe('documents', () => {
		it('document within a document', async () => {
			// Is this a thing?
			// I feel like this shouldn't be a thing, but it works
			const sanitySchema = defineField({
				name: 'parent',
				type: 'document',
				fields: [
					{
						name: 'child',
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
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'parent';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				child?: {
					_type: 'child';
					_id: string;
					_createdAt?: string;
					_updatedAt?: string;
					_rev?: string;
					text?: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'parent';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				child?: {
					_type: 'child';
					_id: string;
					_createdAt?: string;
					_updatedAt?: string;
					_rev?: string;
					text?: string;
				};
			}>();
		});
	});

	describe('nested objects', () => {
		it('document with a nested object field', async () => {
			const sanitySchema = defineField({
				name: 'parent',
				type: 'document',
				fields: [
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
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'parent';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				nested?: {
					text?: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'parent';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				nested?: {
					text?: string;
				};
			}>();
		});

		it('document with 20 levels of nesting', async () => {
			// Maybe 20 is overkill to test this, but it works
			// Good luck to whoever has to deal with 20 levels of nesting
			const sanitySchema = defineField({
				name: 'test',
				type: 'document',
				fields: [
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
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				level1?: {
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
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				level1?: {
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
				};
			}>();
			// Find Wally for the missing question mark
			expectType<typeof output>().not.toStrictEqual<{
				_type: 'test';
				level1?: {
					level2?: {
						level3?: {
							level4?: {
								level5?: {
									level6?: {
										level7?: {
											level8: {
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
				};
			}>();
		});
	});

	describe('document', () => {
		it('document with an array of strings', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'document',
				fields: [
					{
						name: 'strings',
						type: 'array',
						of: [{type: 'string'}],
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				strings?: string[];
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				strings?: string[];
			}>();
		});

		it('document with an array of objects', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'document',
				fields: [
					{
						name: 'objects',
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
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				objects?: {
					_key: string;
					text?: string;
				}[];
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				objects?: {
					_key: string;
					text?: string;
				}[];
			}>();
		});

		it('multiple levels of nesting between array and object', async () => {
			// This is a bit of a silly example, but it works
			const sanitySchema = defineField({
				name: 'test',
				type: 'document',
				fields: [
					{
						name: 'objects',
						type: 'array',
						of: [
							{
								type: 'object',
								fields: [
									{
										name: 'nested',
										type: 'object',
										fields: [
											{
												name: 'text',
												type: 'string',
											},
											{
												name: 'values',
												type: 'array',
												of: [
													{type: 'boolean'},
													{type: 'number'},
													{
														type: 'object',
														name: 'customBoolean',
														fields: [
															{
																name: 'value',
																type: 'boolean',
															},
															{
																name: 'title',
																type: 'string',
															},
														],
													},
													{
														type: 'object',
														name: 'customNumber',
														fields: [
															{
																name: 'value',
																type: 'number',
															},
															{
																name: 'title',
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
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				objects?: {
					_key: string;
					nested?: {
						text?: string;
						values?: (
							| boolean
							| number
							| {
									_key: string;
									_type: 'customBoolean';
									value?: boolean;
									title?: string;
							  }
							| {
									_key: string;
									_type: 'customNumber';
									value?: number;
									title?: string;
							  }
						)[];
					};
				}[];
			}>();
			expectType<typeof output>().toStrictEqual<{
				_type: 'test';
				_id: string;
				_createdAt?: string;
				_updatedAt?: string;
				_rev?: string;
				objects?: {
					_key: string;
					nested?: {
						text?: string;
						values?: (
							| boolean
							| number
							| {
									_key: string;
									_type: 'customBoolean';
									value?: boolean;
									title?: string;
							  }
							| {
									_key: string;
									_type: 'customNumber';
									value?: number;
									title?: string;
							  }
						)[];
					};
				}[];
			}>();
		});
	});
});

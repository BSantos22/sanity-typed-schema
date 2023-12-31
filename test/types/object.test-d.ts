import type {
	ArbitraryTypedObject,
	PortableTextMarkDefinition,
	PortableTextSpan,
} from '@portabletext/types';
import {toOutput} from 'src/convert';
import {defineField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('object', () => {
	describe('simple types', () => {
		it('object with a block field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'text',
						type: 'block',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
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

		it('object with a boolean field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'isTrue',
						type: 'boolean',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{isTrue?: boolean}>();
			expectType<typeof output>().toStrictEqual<{isTrue?: boolean}>();
		});

		it('object with a date field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'when',
						type: 'date',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{when?: string}>();
			expectType<typeof output>().toStrictEqual<{when?: string}>();
		});

		it('object with a datetime field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'when',
						type: 'datetime',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{when?: string}>();
			expectType<typeof output>().toStrictEqual<{when?: string}>();
		});

		it('object with an email field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'where',
						type: 'email',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{where?: string}>();
			expectType<typeof output>().toStrictEqual<{where?: string}>();
		});

		it('object with a geopoint field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'where',
						type: 'geopoint',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				where?: {
					_type: 'geopoint';
					lat?: number;
					lng?: number;
					alt?: number;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				where?: {
					_type: 'geopoint';
					lat?: number;
					lng?: number;
					alt?: number;
				};
			}>();
		});

		it('object with a number field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
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
				count?: number;
				options?: 1 | 2 | 3 | 4 | 5;
			}>();
			expectType<typeof output>().toStrictEqual<{
				count?: number;
				options?: 1 | 2 | 3 | 4 | 5;
			}>();
		});

		it('object with a reference field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'ref',
						type: 'reference',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				ref?: {
					_type: 'reference';
					_ref: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				ref?: {
					_type: 'reference';
					_ref: string;
				};
			}>();
		});

		it('object with a slug field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'sluggySlug',
						type: 'slug',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				sluggySlug?: {
					_type: 'slug';
					current?: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				sluggySlug?: {
					_type: 'slug';
					current?: string;
				};
			}>();
		});

		it('object with a string field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
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
			expectTypeOf(output).toEqualTypeOf<{text?: string; options?: 'test1' | 'test2'}>();
			expectType<typeof output>().toStrictEqual<{
				text?: string;
				options?: 'test1' | 'test2';
			}>();
		});

		it('object with a text field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
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
				longText?: string;
				options?: 'logTest1' | 'longTest2';
			}>();
			expectType<typeof output>().toStrictEqual<{
				longText?: string;
				options?: 'logTest1' | 'longTest2';
			}>();
		});

		it('object with a url field', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
					{
						name: 'uniformResourceLocator',
						type: 'url',
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				uniformResourceLocator?: string;
			}>();
			expectType<typeof output>().toStrictEqual<{
				uniformResourceLocator?: string;
			}>();
		});
	});

	describe('documents', () => {
		it('object with a document field', async () => {
			// Is this a thing?
			// I feel like this shouldn't be a thing, but it works
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
				fields: [
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
			expectTypeOf(output).toEqualTypeOf<{
				doc?: {
					_type: 'doc';
					_id: string;
					_createdAt?: string;
					_updatedAt?: string;
					_rev?: string;
					text?: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				doc?: {
					_type: 'doc';
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
		it('object with a nested object field', async () => {
			const sanitySchema = defineField({
				name: 'test',
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
						],
					},
				],
			});
			const output = toOutput(sanitySchema);
			expectTypeOf(output).toEqualTypeOf<{
				nested?: {
					text?: string;
				};
			}>();
			expectType<typeof output>().toStrictEqual<{
				nested?: {
					text?: string;
				};
			}>();
		});

		it('object with 20 levels of nesting', async () => {
			// Maybe 20 is overkill to test this, but it works
			// Good luck to whoever has to deal with 20 levels of nesting
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
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

	describe('array', () => {
		it('object with an array of strings', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
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
				strings?: string[];
			}>();
			expectType<typeof output>().toStrictEqual<{
				strings?: string[];
			}>();
		});

		it('object with an array of objects', async () => {
			const sanitySchema = defineField({
				name: 'test',
				type: 'object',
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
				objects?: {
					_key: string;
					text?: string;
				}[];
			}>();
			expectType<typeof output>().toStrictEqual<{
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
				type: 'object',
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

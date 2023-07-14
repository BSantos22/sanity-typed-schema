import {fragmentField, fragmentType} from 'src/schema';
import {heading} from 'test/schema/page-sections/heading.test';
import {articleListAll} from 'test/schema/page-sections/article-list-all.test';
import {cardLinks} from 'test/schema/page-sections/card-links.test';
import {infoGrid} from 'test/schema/page-sections/info-grid.test';
import {licensePlate} from 'test/schema/page-sections/license-plate.test';
import {supplierSection} from 'test/schema/page-sections/supplier.test';
import {text} from 'test/schema/page-sections/text.test';
import {textWithImage} from 'test/schema/page-sections/text-with-image.test';
import {twoColumn} from 'test/schema/page-sections/two-column.test';
import {tyreSelect} from 'test/schema/page-sections/tyre-select.test';
import {services} from 'test/schema/page-sections/services.test';
import {contact} from 'test/schema/page-sections/contact.test';
import {describe, expectTypeOf, it} from 'vitest';
import {toOutput} from 'src/convert';
import type {Reference} from '@sanity/types';
import type {SetOptional} from 'type-fest';
import type {PortableTextBlock} from '@portabletext/types';

export const page = () =>
	fragmentType({
		name: 'page',
		type: 'document',
		title: 'Sider',
		fields: [title(), slug(), headingSection(), contentSections()],
		preview: {
			select: {
				title: 'title',
			},
			prepare: (select) => ({
				title: select.title,
			}),
		},
	});

const title = () =>
	fragmentField({
		name: 'title',
		type: 'string',
		title: 'Sidetittel',
		description: 'Tittel for nettsiden, denne vises i fanen.',
		validation: (Rule) => Rule.required(),
	});

const slug = () =>
	fragmentField({
		name: 'slug',
		type: 'slug',
		title: 'Slug',
		options: {
			source: 'title',
		},
		validation: (Rule) => Rule.required(),
	});

const headingSection = () => heading();

const contentSections = () =>
	fragmentField({
		name: 'content',
		title: 'Innhold',
		type: 'array',
		of: [
			articleListAll(),
			cardLinks(),
			contact(),
			infoGrid(),
			licensePlate(),
			services(),
			supplierSection(),
			text(),
			textWithImage(),
			twoColumn(),
			tyreSelect(),
		],
	});

describe('service', () => {
	it('schema', async () => {
		type Test = {
			_type: 'page';
			title: string;
			slug: {
				_type: 'slug';
				current?: string;
			};
			heading: (
				| {
						_type: 'textHeading';
						title: string;
						backgroundImage: {
							_type: 'image';
							asset: Reference;
							hotspot: {
								_type?: 'sanity.imageHotspot';
								width: number;
								height: number;
								x: number;
								y: number;
							};
						};
				  }
				| {
						_type: 'hero';
						title: string;
						mainImage: {
							_type: 'image';
							asset: Reference;
							hotspot: {
								_type?: 'sanity.imageHotspot';
								width: number;
								height: number;
								x: number;
								y: number;
							};
							altText: string;
						};
						backgroundImage: {
							_type: 'image';
							asset: Reference;
							hotspot: {
								_type?: 'sanity.imageHotspot';
								width: number;
								height: number;
								x: number;
								y: number;
							};
						};
						content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
				  }
			)[];
			content: (
				| {
						_type: 'articleListAll';
						title: string;
						theme: 'dark' | 'light';
				  }
				| {
						_type: 'cardLinks';
						links: {
							_type: 'link';
							type: 'internal' | 'external';
							reference: Reference;
							query: string;
							href: string;
							targetBlank: boolean;
							icon: 'car-glass' | 'tyres' | 'services' | 'road' | 'e-car' | 'crack';
							title: string;
							content: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
							supplier: Reference;
						}[];
				  }
				| {
						_type: 'contact';
						forms: {
							_type: 'form';
							type: string;
							id: string;
							text: {
								_type: 'text';
								annotation: string;
								title: string;
								content: ({_type: 'block'} & SetOptional<
									PortableTextBlock,
									'children'
								>)[];
							};
							fields: {
								_type: 'field';
								label: string;
								placeholder: string;
								isTextarea: boolean;
								isRequired: boolean;
								info: ({_type: 'block'} & SetOptional<
									PortableTextBlock,
									'children'
								>)[];
							}[];
							checkboxes: {
								_type: 'checkbox';
								reason: string;
								checkText: string;
							}[];
							confirmText: string;
						}[];
						location: {
							_type: 'location';
							annotation: string;
							title: string;
							content: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
						};
				  }
				| {
						_type: 'infoGrid';
						title: string;
						items: {
							_type: 'item';
							title: string;
							image: {
								_type: 'image';
								asset: Reference;
								hotspot: {
									_type?: 'sanity.imageHotspot';
									width: number;
									height: number;
									x: number;
									y: number;
								};
								altText: string;
							};
							content: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
						}[];
						theme: 'light' | 'dark';
				  }
				| {
						_type: 'licensePlate';
						title: string;
						label: string;
				  }
				| {
						_type: 'services';
						textBlock: {
							_type: 'textBlock';
							annotation: string;
							title: string;
							content: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
						};
				  }
				| {
						_type: 'supplierSection';
						supplier: Reference;
						content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
						theme: 'light' | 'dark';
				  }
				| {
						_type: 'textSection';
						align: 'left' | 'center';
						width: 'normal' | 'narrow';
						content: {
							_type: 'content';
							annotation: string;
							title: string;
							content: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
						};
						theme: 'light' | 'dark';
				  }
				| {
						_type: 'textWithImage';
						content: {
							_type: 'content';
							annotation: string;
							title: string;
							content: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
						};
						backgroundIcon:
							| 'car-glass'
							| 'tyres'
							| 'services'
							| 'road'
							| 'e-car'
							| 'crack';
						imageSide: 'left' | 'right';
						image: {
							_type: 'image';
							asset: Reference;
							hotspot: {
								_type?: 'sanity.imageHotspot';
								width: number;
								height: number;
								x: number;
								y: number;
							};
							altText: string;
						};
						theme: 'light' | 'dark';
				  }
				| {
						_type: 'twoColumn';
						title: string;
						titleInvisible: boolean;
						left: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
						right: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
						align: 'left' | 'center';
						theme: 'light' | 'dark';
				  }
				| {
						_type: 'tyreSelect';
						title: string;
						summerTyreDates: {
							_type: 'summerTyreDates';
							start: {
								_type: 'start';
								month: number;
								day: number;
							};
							end: {
								_type: 'end';
								month: number;
								day: number;
							};
						};
						winterTyreDates: {
							_type: 'winterTyreDates';
							start: {
								_type: 'start';
								month: number;
								day: number;
							};
							end: {
								_type: 'end';
								month: number;
								day: number;
							};
						};
						description: {
							_type: 'description';
							selected: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
							unselected: ({_type: 'block'} & SetOptional<
								PortableTextBlock,
								'children'
							>)[];
						};
						image: {
							_type: 'image';
							asset: Reference;
							hotspot: {
								_type?: 'sanity.imageHotspot';
								width: number;
								height: number;
								x: number;
								y: number;
							};
							altText: string;
						};
				  }
			)[];
		};

		const sanitySchema = page();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});

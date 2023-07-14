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
import type {PageTest} from 'test/types/documents/page';

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
		const sanitySchema = page();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<PageTest>();
	});
});

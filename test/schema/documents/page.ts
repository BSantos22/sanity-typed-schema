import {fragmentField, fragmentType} from 'src/schema';
import {heading} from 'test/schema/page-sections/heading';
import {articleListAll} from 'test/schema/page-sections/article-list-all.test';
import {cardLinks} from 'test/schema/page-sections/card-links.test';
import {infoGrid} from 'test/schema/page-sections/info-grid';
import {licensePlate} from 'test/schema/page-sections/license-plate.test';
import {supplierSection} from 'test/schema/page-sections/supplier';
import {text} from 'test/schema/page-sections/text';
import {textWithImage} from 'test/schema/page-sections/text-with-image';
import {twoColumn} from 'test/schema/page-sections/two-column';
import {tyreSelect} from 'test/schema/page-sections/tyre-select';
import {services} from 'test/schema/page-sections/services';
import {contact} from 'test/schema/page-sections/contact';

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

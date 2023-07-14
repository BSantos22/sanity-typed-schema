import {fragmentField} from 'src/typing';
import {link} from 'test/schema/primitives/link';
import {EMPHASIS, STRONG, portableText} from 'test/schema/primitives/portable-text';
import {icon} from 'test/schema/primitives/icon';

export const cardLinks = () =>
	fragmentField({
		name: 'cardLinks',
		title: 'Card lenker',
		type: 'object',
		fields: [cards()],
		preview: {
			prepare: () => ({
				title: 'Card lenker',
			}),
		},
	});

const cards = () =>
	fragmentField({
		name: 'links',
		title: 'Lenker',
		type: 'array',
		of: [card()],
		validation: (Rule) => Rule.required().min(1),
	});

const card = () =>
	fragmentField({
		name: 'link',
		title: 'Lenke',
		type: 'object',
		fields: [...link().fields, mainIcon(), title(), content(), supplier()],
		preview: {
			select: {
				title: 'title',
				type: 'type',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `Card lenke ${select.type === 'internal' ? 'intern' : 'ekstern'}`,
			}),
		},
	});

const mainIcon = () =>
	fragmentField({
		...icon(),
		validation: (Rule) => Rule.required(),
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
		validation: (Rule) => Rule.required(),
	});

const content = () =>
	fragmentField({
		...portableText({
			decorators: [EMPHASIS, STRONG],
		}),
		name: 'content',
		title: 'Innhold',
	});

const supplier = () =>
	fragmentField({
		name: 'supplier',
		title: 'Leverandør',
		type: 'reference',
		to: [{type: 'supplier'}],
	});

import {fragmentField} from 'src/schema';
import {link} from 'test/schema/primitives/link.test';
import {EMPHASIS, STRONG, portableText} from 'test/schema/primitives/portable-text.test';
import {icon} from 'test/schema/primitives/icon.test';
import {describe, expectTypeOf, it} from 'vitest';
import type {OutputType} from 'src/types-output';
import type {PortableTextBlock, Reference} from '@sanity/types';
import type {SetOptional, Simplify} from 'type-fest';
import type {FragmentDefinition} from 'src/types-schema';

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
			styles: [],
			annotations: [],
			lists: [],
			customTypes: [],
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

describe('card-links', () => {
	it('schema', async () => {
		type Test = {
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
				content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
				supplier: Reference;
			}[];
		};

		const sanitySchema = cardLinks();
		const value = output(sanitySchema);
		//type Output = OutputType<typeof sanitySchema>;
		//expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

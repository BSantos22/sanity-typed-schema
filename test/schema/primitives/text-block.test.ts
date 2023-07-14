import type {PortableTextBlock} from '@sanity/types';
import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import type {OutputType} from 'src/types-output';
import type {PortableTextArgs} from 'test/schema/primitives/portable-text.test';
import {portableText} from 'test/schema/primitives/portable-text.test';
import type {SetOptional} from 'type-fest';
import {describe, expectTypeOf, it} from 'vitest';

export const textBlock = (args: PortableTextArgs) =>
	fragmentField({
		name: 'textBlock',
		title: 'Innhold',
		type: 'object',
		fields: [annotation(), title(), content(args)],
		preview: {
			select: {
				annotation: 'annotation',
				title: 'title',
			},
			prepare: (select) => ({
				title: select.annotation ?? select.title ?? 'Innholdsblokk',
				subtitle: (select.annotation || select.title) && 'Innholdsblokk',
			}),
		},
	});

const annotation = () =>
	fragmentField({
		name: 'annotation',
		title: 'Annotering',
		type: 'string',
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
	});

const content = (args: PortableTextArgs) =>
	fragmentField({
		...portableText(args),
		name: 'content',
		title: 'Innhold',
	});

describe('text-block', () => {
	it('schema', async () => {
		type Test = {
			_type: 'textBlock';
			annotation: string;
			title: string;
			content: ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];
		};

		const sanitySchema = textBlock({
			styles: [],
			annotations: [],
			lists: [],
			decorators: [],
			customTypes: [],
		});

		type Output = OutputType<typeof sanitySchema>;
		expectTypeOf<Output>().toEqualTypeOf<Test>();
	});
});

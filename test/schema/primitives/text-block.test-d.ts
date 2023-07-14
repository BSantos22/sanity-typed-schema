import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import type {
	Annotations,
	CustomTypes,
	Decorators,
	Lists,
	Styles,
} from 'test/schema/primitives/portable-text.test-d';
import {CALL_TO_ACTION, portableText} from 'test/schema/primitives/portable-text.test-d';
import type {TextBlockTest} from 'test/types/primitives/text-block';
import {describe, expectTypeOf, it} from 'vitest';

export const textBlock = <
	const S extends readonly Styles[],
	const A extends readonly Annotations[],
	const L extends readonly Lists[],
	const D extends readonly Decorators[],
	const C extends readonly CustomTypes[]
>(args: {
	styles: S;
	annotations: A;
	lists: L;
	decorators: D;
	customTypes: C;
}) =>
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

const content = <
	const S extends readonly Styles[],
	const A extends readonly Annotations[],
	const L extends readonly Lists[],
	const D extends readonly Decorators[],
	const C extends readonly CustomTypes[]
>(args: {
	styles: S;
	annotations: A;
	lists: L;
	decorators: D;
	customTypes: C;
}) =>
	fragmentField({
		...portableText(args),
		name: 'content',
		title: 'Innhold',
	});

describe('text-block', () => {
	it('schema', async () => {
		const sanitySchema = textBlock({
			styles: [],
			annotations: [],
			lists: [],
			decorators: [],
			customTypes: [],
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<TextBlockTest>();
	});

	it('schema with fields', async () => {
		const sanitySchema = textBlock({
			styles: [],
			annotations: [],
			lists: [],
			decorators: [],
			customTypes: [CALL_TO_ACTION],
		});
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<TextBlockTest>();
	});
});
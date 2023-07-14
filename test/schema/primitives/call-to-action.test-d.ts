import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {link} from 'test/schema/primitives/link.test-d';
import type {CallToActionTest} from 'test/schema/primitives/call-to-action';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const callToAction = () =>
	fragmentField({
		title: 'Call To Action',
		name: 'callToAction',
		type: 'object',
		fields: [text(), ...link().fields],
		preview: {
			select: {
				title: 'text',
				type: 'type',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `Call To Action ${select.type === 'internal' ? 'intern' : 'ekstern'}`,
			}),
		},
	});

const text = () =>
	fragmentField({
		name: 'text',
		type: 'string',
		title: 'Tekst',
		validation: (Rule) => Rule.required(),
	});

describe('call-to-action', () => {
	it('schema', async () => {
		const sanitySchema = callToAction();
		const output = toOutput(sanitySchema);

		expectTypeOf(output.href).toEqualTypeOf<CallToActionTest['href']>();
		expectTypeOf(output.query).toEqualTypeOf<CallToActionTest['query']>();
		expectTypeOf(output.reference).toEqualTypeOf<CallToActionTest['reference']>();
		expectTypeOf(output.targetBlank).toEqualTypeOf<CallToActionTest['targetBlank']>();
		expectTypeOf(output.text).toEqualTypeOf<CallToActionTest['text']>();
		expectTypeOf(output.type).toEqualTypeOf<CallToActionTest['type']>();
		expectTypeOf(output).toEqualTypeOf<CallToActionTest>();
		expectType<typeof output.href>().toStrictEqual<CallToActionTest['href']>();
		expectType<typeof output.query>().toStrictEqual<CallToActionTest['query']>();
		expectType<typeof output.reference>().toStrictEqual<CallToActionTest['reference']>();
		expectType<typeof output.targetBlank>().toStrictEqual<CallToActionTest['targetBlank']>();
		expectType<typeof output.text>().toStrictEqual<CallToActionTest['text']>();
		expectType<typeof output.type>().toStrictEqual<CallToActionTest['type']>();
		expectType<typeof output>().toStrictEqual<CallToActionTest>();
	});
});

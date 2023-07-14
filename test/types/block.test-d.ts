import type {
	ArbitraryTypedObject,
	PortableTextMarkDefinition,
	PortableTextSpan,
} from '@portabletext/types';
import {toOutput} from 'src/convert';
import {fragmentField} from 'src/schema';
import {expectType} from 'test/utils';
import {describe, expectTypeOf, it} from 'vitest';

describe('block', () => {
	it('base schema', async () => {
		const sanitySchema = fragmentField({
			name: 'test',
			type: 'block',
		});
		const output = toOutput(sanitySchema);

		// Ideally this would output a PortableTextBlock that is fully typed.
		// Since @portabletext/react doesn't take into account the generics of the PortableTextBlock,
		// it doesn't really matter at the moment anyways
		expectTypeOf(output).toEqualTypeOf<{
			_type: 'block';
			_key?: string;
			markDefs?: PortableTextMarkDefinition[];
			style?: string;
			listItem?: string;
			level?: number;
			children?: (ArbitraryTypedObject | PortableTextSpan)[] | undefined;
		}>();
		expectType<typeof output>().toStrictEqual<{
			_type: 'block';
			_key?: string;
			markDefs?: PortableTextMarkDefinition[];
			style?: string;
			listItem?: string;
			level?: number;
			children?: (ArbitraryTypedObject | PortableTextSpan)[] | undefined;
		}>();
	});
});

/* eslint-disable @typescript-eslint/ban-types */
import type {
	ArrayDef,
	BlockDef,
	DocumentDef,
	FileDef,
	FragmentDefinition,
	ImageDef,
	NumberDef,
	ObjectDef,
	StringDef,
	TextDef,
} from './types-schema';
import type {FileValue, ImageCrop, ImageHotspot, ImageOptions} from '@sanity/types';
import type {PortableTextBlock} from '@portabletext/types';
import type {SetOptional, SetRequired, Simplify} from 'type-fest';
import type {ReadonlyObjectDeep} from 'type-fest/source/readonly-deep';

export type OutputType<T extends FragmentDefinition> = T['type'] extends 'array'
	? T extends ArrayDef
		? Simplify<OutputArray<T>>
		: never
	: T['type'] extends 'block'
	? T extends BlockDef
		? Simplify<OutputBlock<T>>
		: never
	: T['type'] extends 'boolean'
	? OutputBoolean
	: T['type'] extends 'date'
	? OutputDate
	: T['type'] extends 'datetime'
	? OutputDatetime
	: T['type'] extends 'document'
	? T extends DocumentDef
		? Simplify<OutputDocument<T>>
		: never
	: T['type'] extends 'email'
	? OutputEmail
	: T['type'] extends 'file'
	? T extends FileDef
		? Simplify<OutputFile<T>>
		: never
	: T['type'] extends 'geopoint'
	? OutputGeopoint
	: T['type'] extends 'image'
	? T extends ImageDef
		? Simplify<OutputImage<T>>
		: never
	: T['type'] extends 'number'
	? T extends NumberDef
		? Simplify<OutputNumber<T>>
		: never
	: T['type'] extends 'object'
	? T extends ObjectDef
		? Simplify<OutputObject<T>>
		: never
	: T['type'] extends 'reference'
	? OutputReference
	: T['type'] extends 'slug'
	? OutputSlug
	: T['type'] extends 'string'
	? T extends StringDef
		? Simplify<OutputString<T>>
		: never
	: T['type'] extends 'text'
	? T extends TextDef
		? Simplify<OutputText<T>>
		: never
	: T['type'] extends 'url'
	? OutputUrl
	: never;

type OutputArray<T extends ArrayDef> = OutputArrayElements<T['of']>;

type OutputArrayElements<T extends readonly FragmentDefinition[]> = {
	[Key in keyof T]: Simplify<{_type: T[Key]['name']; _key: string} & OutputType<T[Key]>>;
}[number][];

type OutputBlock<T extends BlockDef> = Simplify<
	{_type: 'block'} & SetOptional<
		PortableTextBlock /*<
			OutputBlockMarks<T>,
			OutputBlockChildren<T>,
			OutputBlockStyles<T>,
			OutputBlockLists<T>
		>*/,
		'children'
	>
>;

type OutputBlockMarks<T extends BlockDef> = T['marks'] extends readonly FragmentDefinition[]
	? OutputBlockMarksDef<T['marks']>
	: {[key: string]: unknown};

type OutputBlockMarksDef<T extends readonly FragmentDefinition[] | undefined> =
	T extends readonly FragmentDefinition[]
		? {
				[Key in NonNullable<T[number]['name']>]: OutputType<
					Extract<T[number], {name: Key}>
				>;
		  }
		: never;

type OutputBlockChildren<T extends readonly FragmentDefinition[]> = {
	[Key in keyof T]: OutputType<T[Key]>;
};

type OutputBoolean = boolean;

type OutputDate = string;

type OutputDatetime = string;

type OutputDocument<T extends DocumentDef> = {
	_type: T['name'];
} & (T['fields'] extends readonly FragmentDefinition[] ? OutputFieldsDef<T['fields']> : never);

type OutputEmail = string;

type OutputFile<T extends FileDef> = {
	asset?: OutputReference;
} & OutputFileFields<T>;

type OutputFileFields<T extends FileDef> = T['fields'] extends readonly FragmentDefinition[]
	? OutputFieldsDef<T['fields']>
	: {};

type OutputGeopoint = {
	_type: 'geopoint';
	lat?: number;
	lng?: number;
	alt?: number;
};

type OutputImage<T extends ImageDef> = {
	asset?: OutputReference;
} & OutputImageOptions<T['options']> &
	OutputImageFields<T>;

type OutputImageOptions<T extends ReadonlyObjectDeep<ImageOptions> | undefined> = T extends {
	hotspot?: boolean;
}
	? T['hotspot'] extends true
		? {hotspot?: OutputImageHotspot; crop?: OutputImageCrop}
		: {}
	: {};

type OutputImageHotspot = SetRequired<Partial<ImageHotspot>, '_type'>;
type OutputImageCrop = SetRequired<Partial<ImageCrop>, '_type'>;

type OutputImageFields<T extends ImageDef> = T['fields'] extends readonly FragmentDefinition[]
	? OutputFieldsDef<T['fields']>
	: {};

type OutputNumber<T extends NumberDef> = T['options'] extends {
	list: readonly {value: infer U}[];
}
	? U
	: T['options'] extends {
			list: Readonly<Array<infer U>>;
	  }
	? U
	: number;

type OutputObject<T extends ObjectDef> = T['fields'] extends readonly FragmentDefinition[]
	? OutputFieldsDef<T['fields']>
	: never;

type OutputReference = {
	_type: 'reference';
	_ref: string;
};

type OutputSlug = {
	_type: 'slug';
	current?: string;
};

type OutputString<T extends StringDef> = T['options'] extends {
	list: readonly {value: infer U}[];
}
	? U
	: T['options'] extends {
			list: Readonly<Array<infer U>>;
	  }
	? U
	: string;

type OutputText<T extends TextDef> = T['options'] extends {
	list: readonly {value: infer U}[];
}
	? U
	: T['options'] extends {
			list: Readonly<Array<infer U>>;
	  }
	? U
	: string;

type OutputUrl = string;

type OutputFieldsDef<T extends readonly FragmentDefinition[] | undefined> =
	T extends readonly FragmentDefinition[]
		? {
				[Key in NonNullable<T[number]['name']>]?: OutputType<
					Extract<T[number], {name: Key}>
				>;
		  }
		: {};

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
import type {ImageCrop, ImageHotspot, ImageOptions} from '@sanity/types';
import type {PortableTextBlock} from '@portabletext/types';
import type {SetOptional, SetRequired, Simplify} from 'type-fest';
import type {ReadonlyObjectDeep} from 'type-fest/source/readonly-deep';

export type Output<T extends () => FragmentDefinition> = Simplify<OutputType<ReturnType<T>>>;

export type OutputType<T extends FragmentDefinition> = T['type'] extends 'array'
	? T extends ArrayDef
		? Simplify<OutputArray<T>>
		: never
	: T['type'] extends 'block'
	? T extends BlockDef
		? Simplify<OutputBlock>
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

// Typing the options here is actually kinda sketchy in some situations.
// If the user specifies options.list and the of property is a primitive,
// like string, number, etc., then we can limit the the output type
// On the other hand, if there's only types that don't support the options.list,
// the Sanity Studio actually displays an error and the input is disabled
// (so the type should just be never).
// But having an "of" like: [{type: 'url'}, {type: 'string'}] would be valid,
// and the values would be limited to the options.list.
// This is ok behaviour, though, because the value is always going to be [],
// which fulfills the type requirements of U[]
// So I don't know...
type OutputArray<T extends ArrayDef> = T['options'] extends {
	list: readonly {value: infer U}[];
}
	? U[]
	: T['options'] extends {
			list: Readonly<Array<infer U>>;
	  }
	? U[]
	: OutputArrayElements<T['of']>;

// When the value of array items is a primitive, the output type is just the primitive,
// otherwise it's an object with the _type and _key properties
type OutputArrayElements<T extends readonly FragmentDefinition[]> = {
	[Key in keyof T]: T[Key]['type'] extends
		| 'block'
		| 'document'
		| 'file'
		| 'geopoint'
		| 'image'
		| 'object'
		| 'reference'
		| 'slug'
		? T[Key]['name'] extends string
			? Simplify<{_type: T[Key]['name']; _key: string} & Omit<OutputType<T[Key]>, '_type'>>
			: Simplify<{_key: string} & OutputType<T[Key]>>
		: OutputType<T[Key]>;
}[number][];

// Ideally this would output a PortableTextBlock that is fully typed.
// Since @portabletext/react doesn't take into account the generics of the PortableTextBlock,
// it doesn't really matter at the moment anyways
type OutputBlock = Simplify<
	{_type: 'block'} & SetOptional<
		PortableTextBlock,
		//<
		//	OutputBlockMarks<T>,
		//	OutputBlockChildren<T>,
		//	OutputBlockStyles<T>,
		//	OutputBlockLists<T>
		//>
		'children'
	>
>;

type OutputBoolean = boolean;

type OutputDate = string;

type OutputDatetime = string;

type OutputDocument<T extends DocumentDef> = {
	_id: string;
	_type: T['name'];
	_createdAt?: string;
	_updatedAt?: string;
	_rev?: string;
} & (T['fields'] extends readonly FragmentDefinition[] ? OutputFieldsDef<T['fields']> : never);

type OutputEmail = string;

type OutputFile<T extends FileDef> = {
	_type: 'file';
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
	_type: 'image';
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

import type {
	ArrayDef,
	BlockDef,
	DocumentDef,
	FragmentDefinition,
	ImageDef,
	ObjectDef,
} from './types-schema';
import type {
	FileValue,
	GeopointValue,
	ImageCrop,
	ImageHotspot,
	ImageOptions,
	Reference,
	SlugValue,
} from '@sanity/types';
import type {PortableTextBlock} from '@portabletext/types';
import type {SetOptional, SetRequired, Simplify} from 'type-fest';
import type {ReadonlyObjectDeep} from 'type-fest/source/readonly-deep';

export type OutputType<T extends FragmentDefinition> = T['options'] extends {
	list: readonly {value: infer U}[];
}
	? U
	: T['type'] extends 'array'
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
	: T['type'] extends 'file'
	? OutputFile
	: T['type'] extends 'geopoint'
	? OutputGeopoint
	: T['type'] extends 'image'
	? T extends ImageDef
		? Simplify<OutputImage<T>>
		: never
	: T['type'] extends 'number'
	? OutputNumber
	: T['type'] extends 'object'
	? T extends ObjectDef
		? Simplify<OutputObject<T>>
		: never
	: T['type'] extends 'reference'
	? OutputReference
	: T['type'] extends 'slug'
	? OutputSlug
	: T['type'] extends 'string'
	? OutputString
	: T['type'] extends 'text'
	? OutputText
	: T['type'] extends 'url'
	? OutputUrl
	: T['type'] extends 'email'
	? OutputEmail
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
	: // eslint-disable-next-line @typescript-eslint/ban-types
	  {[key: string]: unknown};

type OutputBlockMarksDef<T extends readonly FragmentDefinition[] | undefined> =
	T extends readonly FragmentDefinition[]
		? {
				[Key in NonNullable<T[number]['name']>]: OutputType<
					Extract<T[number], {name: Key}>
				>;
		  }
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  never;

type OutputBlockChildren<T extends readonly FragmentDefinition[]> = {
	[Key in keyof T]: OutputType<T[Key]>;
};

type OutputBoolean = boolean;

type OutputDate = string;

type OutputDatetime = string;

type OutputDocument<T extends DocumentDef> = {
	_type: T['name'];
} & (T['fields'] extends readonly FragmentDefinition[]
	? {
			[Key in NonNullable<T['fields'][number]['name']>]?: OutputType<
				Extract<T['fields'][number], {name: Key}>
			>;
	  }
	: never);

type OutputFile = FileValue;

type OutputGeopoint = GeopointValue;

type OutputImage<T extends ImageDef> = {
	//_type: 'image';
	asset?: Reference;
} & OutputImageOptions<T['options']> &
	OutputImageFields<T>;

type OutputImageOptions<T extends ReadonlyObjectDeep<ImageOptions> | undefined> =
	T extends ReadonlyObjectDeep<ImageOptions>
		? T['hotspot'] extends true
			? {hotspot?: OutputImageHotspot; crop?: OutputImageCrop}
			: // eslint-disable-next-line @typescript-eslint/ban-types
			  {}
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  {};

type OutputImageHotspot = SetRequired<Partial<ImageHotspot>, '_type'>;
type OutputImageCrop = SetRequired<Partial<ImageCrop>, '_type'>;

type OutputImageFields<T extends ImageDef> = T['fields'] extends readonly FragmentDefinition[]
	? OutputImageFieldsDef<T['fields']>
	: // eslint-disable-next-line @typescript-eslint/ban-types
	  {};

type OutputImageFieldsDef<T extends readonly FragmentDefinition[] | undefined> =
	T extends readonly FragmentDefinition[]
		? {
				[Key in NonNullable<T[number]['name']>]?: OutputType<
					Extract<T[number], {name: Key}>
				>;
		  }
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  {};

type OutputNumber = number;

type OutputObject<T extends ObjectDef> = T['fields'] extends readonly FragmentDefinition[]
	? {
			[Key in NonNullable<T['fields'][number]['name']>]?: OutputType<
				Extract<T['fields'][number], {name: Key}>
			>;
	  }
	: never;

type OutputReference = Simplify<Reference>;

type OutputSlug = Simplify<SlugValue>;

type OutputString = string;

type OutputText = string;

type OutputUrl = string;

type OutputEmail = string;

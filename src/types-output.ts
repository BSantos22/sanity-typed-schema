import type {ArrayDef, DocumentDef, FragmentDefinition, ImageDef, ObjectDef} from './types-schema';
import type {
	FileValue,
	GeopointValue,
	ImageHotspot,
	ImageOptions,
	PortableTextBlock,
	Reference,
	SlugValue,
} from '@sanity/types';
import type {SetOptional} from 'type-fest';
import type {ReadonlyObjectDeep} from 'type-fest/source/readonly-deep';

export type OutputType<T extends FragmentDefinition> = T['options'] extends {
	list: readonly {value: infer U}[];
}
	? U
	: T['type'] extends 'array'
	? T extends ArrayDef
		? OutputArray<T>
		: never
	: T['type'] extends 'block'
	? OutputBlock
	: T['type'] extends 'boolean'
	? OutputBoolean
	: T['type'] extends 'date'
	? OutputDate
	: T['type'] extends 'datetime'
	? OutputDatetime
	: T['type'] extends 'document'
	? T extends DocumentDef
		? OutputDocument<T>
		: never
	: T['type'] extends 'file'
	? OutputFile
	: T['type'] extends 'geopoint'
	? OutputGeopoint
	: T['type'] extends 'image'
	? T extends ImageDef
		? OutputImage<T>
		: never
	: T['type'] extends 'number'
	? OutputNumber
	: T['type'] extends 'object'
	? T extends ObjectDef
		? OutputObject<T>
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

type OutputArray<T extends ArrayDef> = OutputType<T['of'][number]>[];

type OutputBlock = {_type: 'block'} & SetOptional<PortableTextBlock, 'children'>;

type OutputBoolean = boolean;

type OutputDate = string;

type OutputDatetime = string;

type OutputDocument<T extends DocumentDef> = {
	_type: T['name'];
} & (T['fields'] extends readonly FragmentDefinition[] ? OutputDocumentFields<T['fields']> : never);

type OutputDocumentFields<T extends readonly FragmentDefinition[]> = {
	[Key in NonNullable<T[number]['name']>]: OutputType<Extract<T[number], {name: Key}>>;
};

type OutputFile = FileValue;

type OutputGeopoint = GeopointValue;

type OutputImage<T extends ImageDef> = {
	_type: 'image';
	asset: Reference;
} & OutputImageOptions<T['options']> &
	OutputImageFields<T>;

type OutputImageOptions<T extends ReadonlyObjectDeep<ImageOptions> | undefined> =
	T extends ReadonlyObjectDeep<ImageOptions>
		? T['hotspot'] extends true
			? {hotspot: ImageHotspot}
			: // eslint-disable-next-line @typescript-eslint/ban-types
			  {}
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  {};

type OutputImageFields<T extends ImageDef> = T['fields'] extends readonly FragmentDefinition[]
	? OutputImageFieldsDef<T['fields']>
	: // eslint-disable-next-line @typescript-eslint/ban-types
	  {};

type OutputImageFieldsDef<T extends readonly FragmentDefinition[] | undefined> =
	T extends readonly FragmentDefinition[]
		? {
				[Key in NonNullable<T[number]['name']>]: OutputType<
					Extract<T[number], {name: Key}>
				>;
		  }
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  {};

type OutputNumber = number;

type OutputObject<T extends ObjectDef> = {
	_type: T['name'];
} & (T['fields'] extends readonly FragmentDefinition[]
	? {
			[Key in NonNullable<T['fields'][number]['name']>]: OutputType<
				Extract<T['fields'][number], {name: Key}>
			>;
	  }
	: never);

type OutputReference = Reference;

type OutputSlug = SlugValue;

type OutputString = string;

type OutputText = string;

type OutputUrl = string;

type OutputEmail = string;

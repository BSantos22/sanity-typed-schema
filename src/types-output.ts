import type {z} from 'zod';
import type {ArrayDef, DocumentDef, FragmentDefinition, ObjectDef} from './types-schema';

export type OutputType<T extends FragmentDefinition> = T['type'] extends 'array'
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
	? OutputImage
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

type OutputArray<T extends ArrayDef> = z.ZodArray<z.ZodUnion<OutputType<T['of'][number]>>>;

type OutputBlock = z.ZodObject<{
	_type: z.ZodLiteral<'block'>;
	// TODO
}>;

type OutputBoolean = z.ZodBoolean;

type OutputDate = z.ZodString;

type OutputDatetime = z.ZodString;

type OutputDocument<T extends DocumentDef> = z.ZodObject<
	{
		_type: z.ZodLiteral<T['name']>;
	} & (T['fields'] extends readonly FragmentDefinition[]
		? {
				[key in NonNullable<T['fields'][number]['name']>]: OutputType<
					Extract<T['fields'][number], {name: key}>
				>;
		  }
		: never)
>;

type OutputFile = z.ZodObject<{
	_type: z.ZodLiteral<'file'>;
	asset: z.ZodObject<{
		_ref: z.ZodString;
		_type: z.ZodLiteral<'reference'>;
	}>;
}>;

type OutputGeopoint = z.ZodObject<{
	_type: z.ZodLiteral<'geopoint'>;
	lat: z.ZodNumber;
	lng: z.ZodNumber;
	alt: z.ZodNumber;
}>;

type OutputImage = z.ZodObject<{
	_type: z.ZodLiteral<'image'>;
	asset: z.ZodObject<{
		_ref: z.ZodString;
		_type: z.ZodLiteral<'reference'>;
	}>;
}>;

type OutputNumber = z.ZodNumber;

type OutputObject<T extends ObjectDef> = z.ZodObject<
	{
		_type: z.ZodLiteral<T['name']>;
	} & (T['fields'] extends readonly FragmentDefinition[]
		? {
				[key in NonNullable<T['fields'][number]['name']>]: OutputType<
					Extract<T['fields'][number], {name: key}>
				>;
		  }
		: never)
>;

type OutputReference = z.ZodObject<{
	_type: z.ZodLiteral<'reference'>;
	_ref: z.ZodString;
}>;

type OutputSlug = z.ZodObject<{
	_type: z.ZodLiteral<'slug'>;
	current: z.ZodString;
}>;

type OutputString = z.ZodString;

type OutputText = z.ZodString;

type OutputUrl = z.ZodString;

type OutputEmail = z.ZodString;

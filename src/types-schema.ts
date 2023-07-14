import type {
	ArrayDefinition,
	BlockDefinition,
	BooleanDefinition,
	DateDefinition,
	DatetimeDefinition,
	DocumentDefinition,
	FileDefinition,
	GeopointDefinition,
	ImageDefinition,
	NumberDefinition,
	ObjectDefinition,
	ReferenceDefinition,
	SlugDefinition,
	StringDefinition,
	TextDefinition,
	UrlDefinition,
	EmailDefinition,
} from '@sanity/types';
import type {SetOptional} from 'type-fest';

// Fields inside of arrays don't have to a required "name" property,
// so we'll just deal with having the name as optional for every type definition.

// Since the Sanity schema is being created as a readonly object,
// the fields property needs to be readonly as well, which explains the
// definitions for ArrayDef, DocumentDef, FileDef, ImageDef, ObjectDef.

export type ArrayDef = SetOptional<
	Pick<ArrayDefinition, 'name' | 'type'> & {
		of: readonly FragmentDefinition[];
	} & {
		options?: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			list?: readonly {value: any}[] | readonly any[];
		};
	},
	'name'
>;
export type BooleanDef = SetOptional<Pick<BooleanDefinition, 'name' | 'type'>, 'name'>;
export type BlockDef = SetOptional<BlockDefinition, 'name'>;
export type DateDef = SetOptional<Pick<DateDefinition, 'name' | 'type'>, 'name'>;
export type DatetimeDef = SetOptional<Pick<DatetimeDefinition, 'name' | 'type'>, 'name'>;
export type DocumentDef = SetOptional<
	Pick<DocumentDefinition, 'type' | 'name'> & {
		fields?: readonly FragmentDefinition[];
	},
	'name'
>;
export type EmailDef = SetOptional<Pick<EmailDefinition, 'name' | 'type'>, 'name'>;
export type FileDef = SetOptional<
	Pick<FileDefinition, 'name' | 'type'> & {
		fields?: readonly FragmentDefinition[];
	},
	'name'
>;
export type GeopointDef = SetOptional<Pick<GeopointDefinition, 'name' | 'type'>, 'name'>;
export type ImageDef = SetOptional<
	Pick<ImageDefinition, 'name' | 'type'> & {
		options?: {
			hotspot?: boolean;
		};
	} & {
		fields?: readonly FragmentDefinition[];
	},
	'name'
>;
export type NumberDef = SetOptional<
	Pick<NumberDefinition, 'name' | 'type'> & {
		options?: {
			list?: readonly {value: number}[] | readonly number[];
		};
	},
	'name'
>;
export type ObjectDef = SetOptional<
	Pick<ObjectDefinition, 'type' | 'name'> & {
		fields?: readonly FragmentDefinition[];
	},
	'name'
>;
export type ReferenceDef = SetOptional<Pick<ReferenceDefinition, 'name' | 'type'>, 'name'>;
export type SlugDef = SetOptional<Pick<SlugDefinition, 'name' | 'type'>, 'name'>;
export type StringDef = SetOptional<
	Pick<StringDefinition, 'name' | 'type'> & {
		options?: {
			list?: readonly {value: string}[] | readonly string[];
		};
	},
	'name'
>;
export type TextDef = SetOptional<
	Pick<TextDefinition, 'name' | 'type'> & {
		options?: {
			list?: readonly {value: string}[] | readonly string[];
		};
	},
	'name'
>;
export type UrlDef = SetOptional<Pick<UrlDefinition, 'name' | 'type'>, 'name'>;

export type FragmentDefinition =
	| ArrayDef
	| BlockDef
	| BooleanDef
	| DateDef
	| DatetimeDef
	| DocumentDef
	| EmailDef
	| FileDef
	| GeopointDef
	| ImageDef
	| NumberDef
	| ObjectDef
	| ReferenceDef
	| SlugDef
	| StringDef
	| TextDef
	| UrlDef;

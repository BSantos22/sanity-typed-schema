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

// Fields inside of arrays don't have to a required "name" property.

// Since the Sanity schema is being created as a readonly object,
// the fields property needs to be readonly as well.

export type ArrayDef = Pick<ArrayDefinition, 'name' | 'type'> & {
	of: readonly FragmentDefinition[];
} & {
	options?: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		list?: readonly {value: any}[] | readonly any[];
	};
};
export type BooleanDef = Pick<BooleanDefinition, 'name' | 'type'>;
export type BlockDef = BlockDefinition;
export type DateDef = Pick<DateDefinition, 'name' | 'type'>;
export type DatetimeDef = Pick<DatetimeDefinition, 'name' | 'type'>;
export type DocumentDef = Pick<DocumentDefinition, 'type' | 'name'> & {
	fields?: readonly FragmentDefinition[];
};
export type EmailDef = Pick<EmailDefinition, 'name' | 'type'>;
export type FileDef = Pick<FileDefinition, 'name' | 'type'> & {
	fields?: readonly FragmentDefinition[];
};
export type GeopointDef = Pick<GeopointDefinition, 'name' | 'type'>;
export type ImageDef = Pick<ImageDefinition, 'name' | 'type'> & {
	options?: {
		hotspot?: boolean;
	};
} & {
	fields?: readonly FragmentDefinition[];
};
export type NumberDef = Pick<NumberDefinition, 'name' | 'type' | 'options'>;
export type ObjectDef = Pick<ObjectDefinition, 'type' | 'name'> & {
	fields?: readonly FragmentDefinition[];
};
export type ReferenceDef = SetOptional<Pick<ReferenceDefinition, 'name' | 'type'>, 'name'>;
export type SlugDef = Pick<SlugDefinition, 'name' | 'type'>;
export type StringDef = Pick<StringDefinition, 'name' | 'type'> & {
	options?: {
		list?: readonly {value: string}[] | readonly string[];
	};
};
export type TextDef = Pick<TextDefinition, 'name' | 'type' | 'options'> & {
	options?: {
		list?: readonly {value: string}[] | readonly string[];
	};
};
export type UrlDef = Pick<UrlDefinition, 'name' | 'type'>;

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

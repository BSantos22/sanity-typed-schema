import type {
	ArrayDefinition,
	BlockDefinition,
	BooleanDefinition,
	DateDefinition,
	DatetimeDefinition,
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
import type {ReadonlyDeep, SetOptional} from 'type-fest';

// The format of the validation function required by defineField doesn't match
// the format of the schema definitions in Sanity, for some reason.
// That field isn't needed anyway, since it has no effect on the outputted zod schema.
type OmitValidation<T> = Omit<T, 'validation'>;

// Fields inside of arrays don't have to a required "name" property.
type OptionalName<T extends {name: string}> = SetOptional<T, 'name'>;

// Since the Sanity schema is being created as a readonly object,
// the fields property needs to be readonly as well.
type Def<T extends {name: string}> = ReadonlyDeep<OptionalName<OmitValidation<T>>>;

export type BooleanDef = Def<Pick<BooleanDefinition, 'name' | 'type'>>;
export type DateDef = Def<Pick<DateDefinition, 'name' | 'type'>>;
export type DatetimeDef = Def<Pick<DatetimeDefinition, 'name' | 'type'>>;
export type EmailDef = Def<Pick<EmailDefinition, 'name' | 'type'>>;
export type FileDef = Def<
	Pick<FileDefinition, 'name' | 'type'> & {
		fields?: readonly FragmentDefinition[];
	}
>;
export type GeopointDef = Def<Pick<GeopointDefinition, 'name' | 'type'>>;
export type ImageDef = Def<
	Pick<ImageDefinition, 'name' | 'type'> & {
		options?: {
			hotspot?: boolean;
		};
	} & {
		fields?: readonly FragmentDefinition[];
	}
>;
export type NumberDef = Def<Pick<NumberDefinition, 'name' | 'type' | 'options'>>;

export type ReferenceDef = Def<Pick<ReferenceDefinition, 'name' | 'type'>>;
export type SlugDef = Def<Pick<SlugDefinition, 'name' | 'type'>>;
export type StringDef = Def<Pick<StringDefinition, 'name' | 'type' | 'options'>>;
export type TextDef = Def<Pick<TextDefinition, 'name' | 'type' | 'options'>>;
export type UrlDef = Def<Pick<UrlDefinition, 'name' | 'type'>>;

/**
 * Things above here have been handled
 */

export type ArrayDef = Omit<Def<ArrayDefinition>, 'of'> & {of: readonly FragmentDefinition[]};

export type BlockDef = Def<BlockDefinition>;

export type DocumentDef = Omit<ObjectDef, 'type'> & {type: 'document'};

export type ObjectDef = Omit<Def<ObjectDefinition>, 'fields'> & {
	fields: readonly FragmentDefinition[];
};

/* export type DocumentDef = Def<
	Pick<DocumentDefinition, 'name' | 'type'> & {
		fields?: readonly FragmentDefinition[];
	}
>;

export type ObjectDef = Def<
	Pick<ObjectDefinition, 'name' | 'type'> & {
		fields?: readonly FragmentDefinition[];
	}
>; */

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

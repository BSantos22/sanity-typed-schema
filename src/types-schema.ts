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
	CrossDatasetReferenceDefinition,
} from '@sanity/types';
import type {ReadonlyDeep, SetOptional} from 'type-fest';

// The format of the validation function required by defineField doesn't match
// the format of the schema definitions in Sanity, for some reason.
// That field isn't needed anyway, since it has no effect on the outputted zod schema.
type OmitValidation<T> = Omit<T, 'validation'>;

// Fields inside of arrays don't have to a required "name" property.
type OptionalName<T extends {name: string}> = SetOptional<T, 'name'>;

type Def<T extends {name: string}> = ReadonlyDeep<OptionalName<OmitValidation<T>>>;

export type ArrayDef = Omit<Def<ArrayDefinition>, 'of'> & {
	of: readonly FragmentDefinition[];
};
export type BlockDef = Def<BlockDefinition>;
export type BooleanDef = Def<BooleanDefinition>;
export type DateDef = Def<DateDefinition>;
export type DatetimeDef = Def<DatetimeDefinition>;
export type DocumentDef = Omit<ObjectDef, 'type'> & {type: 'document'};
export type FileDef = Def<FileDefinition>;
export type GeopointDef = Def<GeopointDefinition>;
export type ImageDef = Def<ImageDefinition>;
export type NumberDef = Def<NumberDefinition>;
// Since the Sanity schema is being created as a readonly object,
// the fields property needs to be readonly as well.
export type ObjectDef = Omit<Def<ObjectDefinition>, 'fields'> & {
	fields: readonly FragmentDefinition[];
};
export type ReferenceDef = Def<ReferenceDefinition>;
export type SlugDef = Def<SlugDefinition>;
export type StringDef = Def<StringDefinition>;
export type TextDef = Def<TextDefinition>;
export type UrlDef = Def<UrlDefinition>;
export type EmailDef = Def<EmailDefinition>;
export type CrossDatasetReferenceDef = Def<CrossDatasetReferenceDefinition>;

export type FragmentDefinition =
	| ArrayDef
	| BlockDef
	| BooleanDef
	| DateDef
	| DatetimeDef
	| DocumentDef
	| FileDef
	| GeopointDef
	| ImageDef
	| NumberDef
	| ObjectDef
	| ReferenceDef
	| SlugDef
	| StringDef
	| TextDef
	| UrlDef
	| EmailDef
	| CrossDatasetReferenceDef;

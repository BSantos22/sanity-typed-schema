/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	DefineArrayMemberBase,
	DefineSchemaBase,
	FieldDefinitionBase,
	IntrinsicTypeName,
	MaybeAllowUnknownProps,
	NarrowPreview,
	StrictDefinition,
	WidenInitialValue,
	WidenValidation,
} from '@sanity/types';

/**
 * This is all straight-up yoinked from @sanity/types, but with the addition of `const` to narrow the type.
 */

export function fragmentType<
	TType extends string | IntrinsicTypeName,
	TName extends string,
	TSelect extends Record<string, string> | undefined,
	TPrepareValue extends Record<keyof TSelect, any> | undefined,
	TAlias extends IntrinsicTypeName | undefined,
	TStrict extends StrictDefinition,
	const Schema extends {
		type: TType;
		name: TName;
	} & DefineSchemaBase<TType, TAlias> &
		NarrowPreview<TType, TAlias, TSelect, TPrepareValue> &
		MaybeAllowUnknownProps<TStrict>
>(schemaDefinition: Schema): typeof schemaDefinition {
	return schemaDefinition;
}

export function fragmentField<
	TType extends string | IntrinsicTypeName,
	TName extends string,
	TSelect extends Record<string, string> | undefined,
	TPrepareValue extends Record<keyof TSelect, any> | undefined,
	TAlias extends IntrinsicTypeName | undefined,
	TStrict extends StrictDefinition,
	const Schema extends {
		type: TType;
		name: TName;
	} & DefineSchemaBase<TType, TAlias> &
		NarrowPreview<TType, TAlias, TSelect, TPrepareValue> &
		MaybeAllowUnknownProps<TStrict> &
		FieldDefinitionBase
>(schemaField: Schema): typeof schemaField & WidenValidation & WidenInitialValue {
	return schemaField;
}

export function fragmentArrayMember<
	TType extends string | IntrinsicTypeName,
	TName extends string,
	TSelect extends Record<string, string> | undefined,
	TPrepareValue extends Record<keyof TSelect, any> | undefined,
	TAlias extends IntrinsicTypeName | undefined,
	TStrict extends StrictDefinition,
	const Schema extends {
		type: TType;
		name?: TName;
	} & DefineArrayMemberBase<TType, TAlias> &
		NarrowPreview<TType, TAlias, TSelect, TPrepareValue> &
		MaybeAllowUnknownProps<TStrict>
>(arrayOfSchema: Schema): typeof arrayOfSchema & WidenValidation & WidenInitialValue {
	return arrayOfSchema;
}

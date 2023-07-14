/**
 * These functions take a Sanity schema definition and
 * return a Zod schema definition inferred from it.
 */
/*
import type {ArrayDef, DocumentDef, FragmentDefinition, ObjectDef} from './types-schema';
import type {OutputType} from './types-output';
import type {Simplify} from 'type-fest';

export const sanityToZod = <T extends FragmentDefinition>(fragment: T): Simplify<OutputType<T>> => {
	switch (fragment.type) {
		case 'array':
			return fragmentArray(fragment) as OutputType<T>;
		case 'block':
			return fragmentBlock() as OutputType<T>;
		case 'boolean':
			return fragmentBoolean() as OutputType<T>;
		case 'date':
			return fragmentDate() as OutputType<T>;
		case 'datetime':
			return fragmentDatetime() as OutputType<T>;
		case 'document':
			return fragmentDocument(fragment) as OutputType<T>;
		case 'file':
			return fragmentFile() as OutputType<T>;
		case 'geopoint':
			return fragmentGeopoint() as OutputType<T>;
		case 'image':
			return fragmentImage() as OutputType<T>;
		case 'number':
			return fragmentNumber() as OutputType<T>;
		case 'object':
			return fragmentObject(fragment) as OutputType<T>;
		case 'reference':
			return fragmentReference() as OutputType<T>;
		case 'slug':
			return fragmentSlug() as OutputType<T>;
		case 'string':
			return fragmentString() as OutputType<T>;
		case 'text':
			return fragmentText() as OutputType<T>;
		case 'url':
			return fragmentUrl() as OutputType<T>;
		case 'email':
			return fragmentEmail() as OutputType<T>;
		default:
			throw new Error('Unknown Sanity type');
	}
};

const fragmentArray = <T extends ArrayDef>(fragment: T) => {
	const arrayItems = fragment.of.map((item) => {
		return sanityToZod(item);
	});

	return z.array(z.union(arrayItems));
};

const fragmentBlock = () => {
	return z.object({
		_type: z.literal('block'),
		children: z.array(
			z.object({
				_key: z.string(),
				_type: z.literal('span'),
				marks: z.array(z.string()),
				text: z.string(),
			})
		),
		markDefs: z.array(
			z.object({
				_key: z.string(),
				_type: z.string(),
			})
		),
		style: z.string(),
	});
};

const fragmentBoolean = () => {
	return z.boolean();
};

const fragmentDate = () => {
	return z.string();
};

const fragmentDatetime = () => {
	return z.string().datetime();
};

const fragmentDocument = <T extends DocumentDef>(fragment: T) => {
	const fields: Record<string, z.ZodTypeAny> = fragment.fields.reduce((acc, field) => {
		if (field.name === undefined) {
			return acc;
		}

		return {
			...acc,
			[field.name]: sanityToZod(field as FragmentDefinition),
		};
	}, {});

	return z.object({
		_type: z.literal('document'),
		...fields,
	});
};

const fragmentFile = () => {
	return z.object({
		_type: z.literal('file'),
		asset: z.object({
			_ref: z.string(),
			_type: z.literal('reference'),
		}),
	});
};

const fragmentGeopoint = () => {
	return z.object({
		_type: z.literal('geopoint'),
		lat: z.number(),
		lng: z.number(),
		alt: z.number().optional(),
	});
};

const fragmentImage = () => {
	return z.object({
		_type: z.literal('image'),
		asset: z.object({
			_ref: z.string(),
			_type: z.literal('reference'),
		}),
	});
};

const fragmentNumber = () => {
	return z.number();
};

const fragmentObject = <T extends ObjectDef>(fragment: T) => {
	const fields: Record<string, z.ZodTypeAny> = fragment.fields.reduce((acc, field) => {
		if (field.name === undefined) {
			return acc;
		}

		console.log(field.name, field);

		return {
			...acc,
			[field.name]: sanityToZod(field),
		};
	}, {});

	if (!fragment.name) {
		return z.object({
			...fields,
		});
	}

	return z.object({
		_type: z.literal(fragment.name),
		...fields,
	});
};

const fragmentReference = () => {
	return z.object({
		_type: z.literal('reference'),
		_ref: z.string(),
	});
};

const fragmentSlug = () => {
	return z.object({
		_type: z.literal('slug'),
		current: z.string(),
	});
};

const fragmentString = () => {
	return z.string();
};

const fragmentText = () => {
	return z.string();
};

const fragmentUrl = () => {
	return z.string();
};

const fragmentEmail = () => {
	return z.string();
};
*/

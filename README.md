# sanity-typed-schema

Get types directly inferred from Sanity schemas. No codegen, no build step, no runtime dependencies.

> This project is still in the exploratory phase.
> Use this if you don't mind the occasional thing missing, and you want to give feedback, so this package can be improved.
> Or use  [@sanity-typed/types](https://github.com/saiichihashimoto/sanity-typed/tree/main/packages/types) for a more mature solution.

---

## Contents

* [Contents](#contents)
* [Installation](#installation)
* [Use](#use)
* [Objective](#objective)
* [Background](#background)
	+ [Approach when creating Sanity schemas](#approach-when-creating-sanity-schemas)
	+ [Sanity schema definitions in code](#sanity-schema-definitions-in-code)
* [The journey to get here](#the-journey-to-get-here)
* [Premise](#premise)
* [Mapping Sanity types to output types](#mapping-sanity-types-to-output-types)
	+ [The easy types](#the-easy-types)
	+ [The easy types with options](#the-easy-types-with-options)
	+ [The built-in Sanity object definitions](#the-built-in-sanity-object-definitions)
	+ [Objects](#objects)
	+ [Documents](#documents)
	+ [Files and image](#files-and-image)
	+ [Arrays](#arrays)
* [Implementation](#implementation)
* [Known problems](#known-problems)
* [TODO](#todo)
* [Final thoughts](#final-thoughts)

---

## Installation

```sh
yarn add sanity-typed-schema
```

---

## Use

Define your schema using the `defineField`, `defineType` and `defineArrayMember` exposed by this library instead of the ones built into Sanity.

```ts
import {defineField} from 'sanity-typed-schema';
```

If your type/field is defined as an object, you can use:

```ts
const slug =
	defineField({
		name: 'slug',
		type: 'slug',
		title: 'Slug'
	});

type Slug = OutputType<typeof slug>;
// type Slug = {
//   _type: 'slug';  
//   current?: string;
// }				
```

If your type/field is defined as a function, you can use:

```ts
const slug = () =>
	defineField({
		name: 'slug',
		type: 'slug',
		title: 'Slug'
	});

type Slug = OutputType<ReturnType<typeof slug>>;
// OR
type Slug = Output<typeof slug>;		  
// type Slug = {
//   _type: 'slug';  
//   current?: string;
// }				
```

You can then use that type to cast the result of whatever GROQ query you do in the frontend:

```ts
const sanityClient = getClient();
const result = await sanityClient.fetch<Slug>(query, params);

// OR

const preview: Slug = usePreview(null, query)
```

It can infer types a lot more complex than a slug! Check [Mapping Sanity types to output types](#mapping-sanity-types-to-output-types) for some more examples of its abilities.

---

## Objective

The main objective of this package is to improve the developer experience when working with Sanity schemas.

Typing responses from Sanity is usually a manual, error-prone process, and this package aims to automate it as much as possible, using the schemas themselves as the source of truth.

---

## Background

To give context over why some decisions were made in the development of this package, here's some background on how we currently use Sanity, and what lead us to creating a package for this.


### Approach when creating Sanity schemas

For content-focused websites, the general approach to define Sanity schemas is to split them up over 3 levels.

**1)** Documents
Top-level schemas, the ones that are used to create documents in Sanity.
They show up as a list on the list, in the Sanity Studio Desk (most of them at least).
These are the entities, the "database tables", the things references can reference.
**For example:** pages, articles, etc.

**2)** Page sections
The content of a page document is an array of page sections.
These are sub-divisions of the page.
Stylistically, they can be thought as full-width divisions of the page. Semantically, they are atoms that can only be added at the page level.
They usually define the layout for that section of the page.
**For example:** a text with image section, a cards section, an article list section, etc.

**3)** Blocks
Re-usable self-contained components that can be included inside of page sections.
Blocks only become their own definition when they get shared between multiple page sections. For most cases, it makes more sense to define a component as an object inside of the section itself. For example, a cards section has the schema for an individual card inside of its own definition, instead of card being its own standalone block.
**For example**: portable text, images, video embeds, etc.

This differentiation between blocks and page sections is made to make it clear what goes at the top level on the page.
It also creates a strict hierarchy for the components - page sections can not be included inside of other page sections - so we have:
- page document -> array of page sections -> blocks
- other documents -> blocks


### Sanity schema definitions in code

```ts
defineConfig({
	schema: {
		types: [article(), page(), siteSettings(), <...>],
		<...>
	}
});

const article = () =>
	defineType({
		name: 'article',
		type: 'document',
		title: 'Artikkel',
		fields: [title(), slug()],
	});

const title = () => 
	defineType({
		name: 'title',
		type: 'string',
		title: 'Tittel',
	});

const slug = () => 
	defineType({
		name: 'slug',
		type: 'string',
		title: 'Slug',
	});
```

The code the schema definitions ends up looking a bit different from the documentation.
All of the types and fields are defined as functions and each definition is separated out instead of being nested inside of the parent.

The fields being separated was an effort at making the schema more readable.
The problem this create was many "Block-scoped variable ... used before its declaration." errors, since it was still desired to have the parent definition at the top of the file. The solution was to make every field definition a function.

This ended up having the added benefit of making the schema very reusable and customizable. For example, when there are multiple workspaces with slight variations, this can be done:

```ts
type Workspace = 'workspaceA' | 'workspaceB'

defineConfig([{
	schema: {
		types: [article('workspaceA'), <...>],
		<...>
	}
}, {
	schema: {
		types: [article('workspaceB'), <...>],
		<...>
	}		
}]);

const article = (workspace: Workspace) =>
	defineType({
		name: 'article',
		type: 'document',
		title: 'Artikkel',
		fields: [workspace === 'workspaceA' ? titleA() : titleB()],
	});

const titleA = () => 
	defineType({
		name: 'title',
		type: 'string',
		title: 'Tittel',
	});

const titleB = () => 
	defineType({
		name: 'title',
		type: 'text',
		title: 'Long title',
	});
```

It also made blocks like Portable Text and Image very composable, since it allows for multiple fields to use the same definition.
At the same time, when defining the schema, the developer has fine-grained control over the variations depending on the specific use case, while still limiting what these types allow, making rendering these components easier in the frontend.

```ts
export const ALT_TEXT = {name: 'altText', title: 'Alternativ tekst', type: 'string'} as const;
export const CAPTION = {name: 'caption', title: 'Bildetekst', type: 'string'} as const;
export const CREDIT = {name: 'credit', title: 'Bildekreditt', type: 'string'} as const;
export const WIDTH = {name: 'width', title: 'Bredde', type: 'number'} as const;

type Field = typeof ALT_TEXT | typeof CAPTION | typeof CREDIT | typeof WIDTH;

export const imageWeb = <const F extends readonly Field[]>(args: {fields: F}) => {
	return defineField({
		name: 'image',
		title: 'Bilde',
		type: 'image',
		options: {
			hotspot: true,
		},
		fields: args.fields,
	})
};

const pageBackgroundImage = () => imageWeb({fields: []});
const articleMainImage = () =>
	defineField({
		...imageWeb({fields: [ALT_TEXT, CAPTION, CREDIT]}),
		title: 'Main Image'
	});
```


## The journey to get here

Our journey of how we defined the types for the data fetched from Sanity was as follows:

**1) Creating the types manually in the frontend**
This was a manual process that was error prone. It was easy to end up with inconsistencies between the expected format and the actual data received.
Collocating the types with the GROQ queries made it more manageable.

**2) Using Zod schemas**
Still a manual process, but it made finding errors quicker. This was around the same time we started using Next.js with the app/ folder, which means any inconsistencies between the data and the types in the frontend were found on at build time.
Even though this gave us more confidence editing the types, it was still slow. It could also become frustrating, especially since some Zod errors can be a bit cryptic.

**3) Creating a library to infer the types from the schema**
With the Sanity Studio embedded in the Next.js application, the Sanity schema was right there, in the same project as the frontend. How hard could it be to infer some types directly from them? Down the rabbit hole we go.

---

## Premise

In theory, it should be easy enough to create this.

```ts
{
	name: 'text',
	type: 'string'
}
// Should output: string

{
	name: 'theme',
	type: 'string',
	options: {
		list: ['dark', 'light']
	}
}
// Should output: 'dark' | 'light'

{
	name: 'textBlock',
	type: 'object',
	fields: [{
		name: 'title',
		type: 'string'
	}, {
		name: 'text',
		type: 'text'
	}]
}
// Should output: {title: string; text: string}

{
	name: 'options',
	type: 'array',
	of: [{type: 'string'}, {type: 'number'}]
}
// Should output: (string | number)[]
```

If the schemas were just object literals this would be fairly straight-forward.
But the defineField, defineType and defineArrayMember functions built in to Sanity are indispensable for correctly typing the schema.

One option would be to override these functions to accept an object literal, instead of the current generic object.
That would require type definitions to be something like `defineField({...} as const)`, which is not ideal, since it puts the burden on the developer to remember to add as const for it to work.

Enter const Type Parameters, a new feature in Typescript v5.0.
After modifying the define functions into this:
```ts
export function defineField<
	TType extends string | IntrinsicTypeName,
	TName extends string,
	TSelect extends Record<string, string> | undefined,
	TPrepareValue extends Record<keyof TSelect, any> | undefined,
	TAlias extends IntrinsicTypeName | undefined,
	TStrict extends StrictDefinition,

	// Adding const here is the only difference from the built-in Sanity defineField
	const Schema extends {
		type: TType;
		name: TName;
	} & DefineSchemaBase<TType, TAlias> &
		NarrowPreview<TType, TAlias, TSelect, TPrepareValue> &
		MaybeAllowUnknownProps<TStrict> &
		FieldDefinitionBase
>(schemaField: Schema) {
	return schemaField;
}
```

This lead to this:

```ts
const title = () =>
	defineField({
		name: 'title',
		type: 'string',
		title: 'Tittel',
		validation: (Rule) => Rule.required(),
	});

// title is now of type
// const title: () => {  
//     readonly name: "title";  
//     readonly type: "string";  
//     readonly title: "Tittel";  
//     readonly validation: (Rule: Rule) => Rule;  
// }
```

Having literals returned from the define functions should make the this doable.

---

## Mapping Sanity types to output types

The most important field to infer the output type is the `type` field of the schema.


### The easy types

Some types are straight-forward to map over:
- types `date`, `datetime`, `email`, and `url` always return a `string`
- type `boolean` always returns a `boolean`

```ts
const date = () =>
	defineField({
		name: 'date',
		type: 'date',
		title: 'Date',
		validation: (Rule) => Rule.required(),
	});

type date = Output<typeof date>;
// type Date = string
```


### The easy types with options

Some types allow for the developer to limit the output type to a few options (rendered as a radio in the Studio).
- types `string` and `text` return a `string` or a `union of string literals`
- type `number` returns a `number` or a `union of number literals`

```ts
const theme = () =>
	defineField({
		name: 'theme',
		type: 'string',
		title: 'Theme',
		options: {
			list: [
				{value: 'dark', title: 'Dark'},
				{value: 'light', title: 'Light'}
			]
		}
	});

type theme = Output<typeof theme>;
// type Theme = 'dark' | 'light'
```


### The built-in Sanity object definitions

- `geopoint` returns an object of format `{_type: 'geopoint', lat?: number, lng?: number, alt?: number}`
- `reference` returns an object of format `{_type: 'reference', _ref: string}`
- `slug` returns an object of format `{_type: 'slug', current?: string}`
- `block` returns a `PortableTextBlock` from `@portabletext/types`

  > Ideally, a fully typed PortableTextBlock would be returned. But since @portabletext/react doesn't take into account the generics of the PortableTextBlock it receives, this isn't a priority to get right, at the moment.

```ts
const slug = () =>
	defineField({
		name: 'slug',
		type: 'slug',
		title: 'Slug'
	});

type Slug = Output<typeof slug>;
// type Slug = {_type: 'slug', current?: string}
```


### Objects

Definitions with type `object` become an object.
Its keys are the `name` fields of each of the items in the `fields` array of the Sanity schema.

>Even if these fields have a `validation` rule to make it mandatory, the returned data might still not have that field defined - this is an issue in preview mode.

```ts
const link = () =>
	defineField({
		name: 'link',
		type: 'object',
		title: 'Lenke',
		fields: [type(), reference(), query(), href(), targetBlank()],
	});

const type = () =>
	defineField({
		name: 'type',
		title: 'Type',
		type: 'string',
		initialValue: 'internal',
		options: {
			list: [
				{title: 'Intern', value: 'internal'},
				{title: 'Ekstern', value: 'external'},
			],
		},
	});

const reference = () =>
	defineField({
		name: 'reference',
		title: 'Intern lenke',
		type: 'reference',
			to: [{type: 'page'}, {type: 'article'}],
			hidden: ({parent}) => parent?.type !== 'internal',
	});

const query = () =>
	defineField({
		name: 'query',
		title: 'Query',
		type: 'string',
		hidden: ({parent}) => parent?.type !== 'internal',
	});

const href = () =>
	defineField({
		name: 'href',
		title: 'URL',
		type: 'url',
		validation: (Rule) =>
			Rule.uri({
				allowRelative: true,
				scheme: ['https', 'http', 'mailto', 'tel'],
			}),
		hidden: ({parent}) => parent?.type !== 'external',
	});

const targetBlank = () =>
	defineField({
		name: 'targetBlank',
		title: 'Åpne i nytt pane',
		type: 'boolean',
		initialValue: true,
		description: 'Åpne lenken i et nytt nettleservindu',
		validation: (Rule) => Rule.required(),
});

type Link = Output<typeof link>;
// type Link = {  
//   reference?: OutputReference;  
//   type?: "internal" | "external";  
//   query?: string;  
//   href?: string;  
//   targetBlank?: boolean;  
// }
```


### Documents

Definitions with type `document` also become an object.
The difference between documents and objects is that a document always has a `_type` field that corresponds to the name field of the definition.

```ts
export const article = () =>
	defineType({
		name: 'article',
		type: 'document',
		fields: [title(), slug()],
	});

const title = () =>
	defineField({
		name: 'title',
		type: 'string',
	});

const slug = () =>
	defineField({
		name: 'slug',
		type: 'slug',
	});

type Article = Output<typeof article>;
// type Article = {  
//   _type: 'article';
//   title: string;
//   slug: {
//     _type: 'slug';
//     current?: string;
//   }
// }
```


### Files and image

Files and images are like objects, where they can have an arbitrary number of fields.
They're different from objects though, because they always have a `_type` field that has the value `file` and `image` respectively, and an `asset` field.

If the hotspot option is set for the image, it will also have a `hotspot` and a `crop` fields.

```ts
export const image = () =>
	defineType({
		name: 'image',
		type: 'image',
		options: {
			hotspot: true,
		},
		fields: [altText()],
	});

const altText = () =>
	defineField({
		name: 'altText',
		type: 'string',
	});

type Image = Output<typeof image>;
// type Image = {  
//   _type: 'image';
//   asset?: {  
//     _type: 'reference';  
//     _ref: string;  
//   };
//   hotspot?: ImageHotspot;
//   crop?: ImageCrop;
//   altText?: string;
// }
```


### Arrays

Arrays output an array of items.
The type of these items is a union of the definitions in the `of` field of the definition.

For types that return primitives (`date`, `datetime`, `email`, `url`, `boolean`, `string`, `text`, and `number`) the output is just an array these types.

For types that return objects, each of the items will always have a `_key` field. Also, they may or may not have a `_type` field.
From testing, it looks that the built-in Sanity object definitions like `reference`, `slug`, `geopoint`, `block`, `file` and `image` either return their own `_type` fields, if their `name` is not defined. Otherwise `_type` becomes the value of `name` field in the schema.

Documents always have their `_type` be equal to their defined `name`.
Objects have can have a `_type`, if their name `name` defined. Otherwise, their `_type` will be missing.

An array can have `options` defined. This gets rendered in the Studio as checkboxes.
When this is the case, the returned data type is a literal union of whatever is in `options.list`.
This is only available for some data types that allow options, which makes typing this a bit sketchy.

If the user specifies `options.list` and the `of` property is a primitive, like `string`, `number`, etc., then we can limit the output type. On the other hand, if there's only types that don't support the `options.list`, the Sanity Studio actually displays an error and the input is disabled (so the type should just be `undefined`).

For example: the type `url` doesn't allow for options, but when there is an array definition of `[{type: 'url'}, {type: 'string'}]`, the control in the Sanity Studio is enabled, and the values are limited to the `options.list` array.

```ts
const mixed =
	  defineField({
		name: 'mixed',
		type: 'array',
		of: [{type: 'string'}, {type: 'number'}, {type: 'date'}],
	});

type Mixed = Output<typeof mixed>;
// type Mixed = (string | number)[]
```


```ts
const bool =
	  defineField({
		name: 'boolean',
		type: 'array',
		of: [{type: 'boolean'}],
		options: {
			list: [
				{title: 'Accepted', value: true},
			],
		},
	});

type Bool = Output<typeof bool>;
// type Bool = true[]
```

```ts
const attachements = 
	defineField({
		name: 'attachments',
		type: 'array',
		of: [{
			name: 'pdf',
			type: 'file',
			fields: [{
				name: 'title',
				type: 'string',
			}, {
				name: 'description',
				type: 'text',
			}],
		}, {
			type: 'object',
			fields: [{
				name: 'json',
				type: 'text',
			}],
		}, {
			name: 'photo',
			type: 'image',
		}, {
			type: 'image'
		}]
	});

type Attachments = Output<typeof attachments>;
// type Attachments = (
//   {  
//     _type: 'pdf';
//     _key: string;  
//     title?: string;  
//     description?: string;  
//     asset?: OutputReference;  
//   } |
//   {
//     _key: string;
//     json?: string;
//   } |
//   {  
//     _type: 'photo';  
//     _key: string;  
//     asset?: OutputReference;  
//   } |
//   {  
//     _type: 'image';
//     _key: string;  
//     asset?: OutputReference;  
//   }
// )[]
```

---

## Implementation

The objective was to arrive at a type `Output` that enabled doing something like
```ts
type Article = Output<typeof article>
```
where `Article` would be the same as the type we previously had to explicitly define.

The `Output` is a generic that receives a `FragmentDefinition` and maps that to its output type, based on its literal definition.

A `FragmentDefinition` is a union of all type definitions from `@sanity/types`, where only the relevant fields for inference were picked from each of the definitions (this was done to manage the complexity of the types for the Typescript compiler).

For example:
```ts
export type BooleanDef = SetOptional<Pick<BooleanDefinition, 'name' | 'type'>, 'name'>;

// BooleanDef = {type: "boolean"; name?: string}
```

OutputType then transforms these like so:
```ts
export type OutputType<T extends FragmentDefinition> = T['type'] extends 'boolean'
	? OutputBoolean // boolean
	: T['type'] extends 'date'
	? OutputDate // string
	: T['type'] extends 'object'
	? OutputObject<T>
	: <...>
```

For types like objects, the types of the fields get inferred my using mapped types:
```ts
type OutputFieldsDef<T extends readonly FragmentDefinition[] | undefined> = T extends readonly FragmentDefinition[]
	? {[Key in NonNullable<T[number]['name']>]?: OutputType<Extract<T[number], {name: Key}>>}
	: {};
```

---

## Known problems

Custom types aren't supported yet, because this is something we don't make much use of, as seen in the [Approach when creating Sanity schemas](#approach-when-creating-sanity-schemas) section.
It was also a core objective to be able to infer types for subsections of the schema, instead of always inferring from the schema as a whole, which conflicts with the use of custom types, as well.

This also means references can't be followed automatically.
After we've migrated to the Nextjs app/ folder, we dereference less things using the GROQ queries, instead having components resolving the data they need themselves, reducing the complexity of the GROQ queries.

A work around for this is doing something like the following:
```ts
groq`
	*[_type == "siteSettings"][0]{
		...,
		frontpage->
	}
`

type SiteSettings = Output<typeof siteSettings>;
type Page = Output<typeof page>;

// By default frontpage would be a page reference, but in the GROQ query this is replaced with the page itself
type SiteSettingWithFrontpage = Omit<SiteSettings, 'frontpage'> & {
	frontpage: Page
}
```

---

## TODO

- Create tests that compare the types against data returned from Sanity;
- Fully type the OutputBlock type, with types for the marks, children, styles, and lists;
- Allow schema definitions with custom types 'myType', instead of just the Sanity built-in ones;
- Create a fully-typed fetch function, without the need for type casts in the frontend;

---

## Final thoughts

In the end, the typing of fetched data from Sanity should be something that is handled by Sanity itself. So the end goal of this package is to make itself obsolete.

But the hope is that, releasing this can help push the development of better typing solutions for Sanity and keep the discussion going.

Last but not least, thanks to [`sanity-codegen`](https://github.com/ricokahler/sanity-codegen) and [`@sanity-typed/schema-builder`](https://github.com/saiichihashimoto/sanity-typed/tree/%40sanity-typed/schema-builder%403.0.1/packages/schema-builder)  for also tackling this problem, and serving as inspiration and motivation to contribute to this issue.

But especially, [@sanity-typed/types](https://github.com/saiichihashimoto/sanity-typed/tree/main/packages/types). When the work on this package started, @sanity-typed/types wasn't released yet. Had it been, this package probably wouldn't have been started.
The approach taken for the two packages is different, which makes the use cases for them also different. But some things done by it are borderline magic. Go and try it out!

(The code used in this project to test types is straight-up yoinked from @sanity-typed/test-utils, because the expectTypeOf function built into Vitest just gives up after a bit of nesting).

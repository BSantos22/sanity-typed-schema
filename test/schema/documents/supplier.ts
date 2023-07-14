import {fragmentField, fragmentType} from 'src/schema';
import {imageWeb} from 'test/schema/primitives/image-web';

export const supplier = () =>
	fragmentType({
		name: 'supplier',
		type: 'document',
		title: 'Leverandør',
		fields: [name(), id(), logo()],
		preview: {
			select: {
				title: 'name',
			},
			prepare: (select) => ({
				title: select.title,
			}),
		},
	});

const name = () =>
	fragmentField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const id = () =>
	fragmentField({
		name: 'id',
		type: 'string',
		title: 'ID',
		validation: (Rule) => Rule.required(),
	});

const logo = () =>
	fragmentField({
		...imageWeb(),
		name: 'logo',
		title: 'Logo',
		validation: (Rule) => Rule.required(),
	});

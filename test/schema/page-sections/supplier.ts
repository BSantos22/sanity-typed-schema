import {fragmentField} from 'src/schema';
import {
	BULLET,
	CALL_TO_ACTION,
	EMPHASIS,
	LINK,
	NUMBERED,
	STRONG,
	portableText,
} from 'test/schema/primitives/portable-text';
import {theme} from 'test/schema/primitives/theme.test';

export const supplierSection = () =>
	fragmentField({
		name: 'supplierSection',
		title: 'Leverandør',
		type: 'object',
		fields: [supplier(), content(), theme()],
		preview: {
			select: {
				title: 'supplier.name',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: 'Leverandør',
			}),
		},
	});

const supplier = () =>
	fragmentField({
		name: 'supplier',
		title: 'Leverandør',
		type: 'reference',
		to: [{type: 'supplier'}],
		validation: (Rule) => Rule.required(),
	});

const content = () =>
	fragmentField({
		...portableText({
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
			customTypes: [CALL_TO_ACTION],
		}),
		name: 'content',
		title: 'Innhold',
	});

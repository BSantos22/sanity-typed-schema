import {fragmentField} from 'src/typing';
import {
	BULLET,
	EMPHASIS,
	LINK,
	NUMBERED,
	STRONG,
	portableText,
} from 'test/schema/primitives/portable-text';
import {textBlock} from 'test/schema/primitives/text-block';

export const contact = () =>
	fragmentField({
		name: 'contact',
		type: 'object',
		title: 'Kontakt',
		fields: [forms(), location()],
		preview: {
			prepare: () => ({
				title: 'Kontakt skjemaer',
			}),
		},
	});

const location = () =>
	fragmentField({
		...textBlock({
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
		}),
		name: 'location',
		title: 'Adresse',
	});

const forms = () =>
	fragmentField({
		name: 'forms',
		type: 'array',
		title: 'Skjemaer',
		of: [form()],
		validation: (Rule) => Rule.required(),
	});

const form = () =>
	fragmentField({
		name: 'form',
		type: 'object',
		title: 'Kontaktskjema',
		fields: [type(), ticketID(), text(), fields(), checkboxes(), confirmText()],
		preview: {
			select: {
				title: 'type',
				subtitle: 'id',
			},
			prepare: (select) => ({
				title: select.title,
				subtitle: `#${select.subtitle}`,
			}),
		},
	});

const type = () =>
	fragmentField({
		name: 'type',
		type: 'string',
		title: 'Type',
		validation: (Rule) => Rule.required(),
	});

const ticketID = () =>
	fragmentField({
		name: 'id',
		type: 'string',
		title: 'ID',
		validation: (Rule) => Rule.required(),
	});

const text = () =>
	fragmentField({
		...textBlock({
			annotations: [LINK],
			lists: [BULLET, NUMBERED],
			decorators: [STRONG, EMPHASIS],
		}),
		name: 'text',
		title: 'Tekst',
	});

const fields = () =>
	fragmentField({
		name: 'fields',
		type: 'array',
		title: 'Felter',
		of: [field()],
		validation: (Rule) => Rule.required().min(1),
	});

const field = () =>
	fragmentField({
		name: 'field',
		type: 'object',
		title: 'Felt',
		fields: [label(), placeholder(), isTextarea(), isRequired(), info()],
	});

const label = () =>
	fragmentField({
		name: 'label',
		type: 'string',
		title: 'Label',
		validation: (Rule) => Rule.required(),
	});

const placeholder = () =>
	fragmentField({
		name: 'placeholder',
		type: 'string',
		title: 'Placeholder',
	});

const isTextarea = () =>
	fragmentField({
		name: 'isTextarea',
		type: 'boolean',
		title: 'Textarea',
		initialValue: false,
		validation: (Rule) => Rule.required(),
	});

const isRequired = () =>
	fragmentField({
		name: 'isRequired',
		type: 'boolean',
		title: 'Påkrevd',
		initialValue: false,
		validation: (Rule) => Rule.required(),
	});

const info = () =>
	fragmentField({
		...portableText({
			annotations: [LINK],
			decorators: [STRONG, EMPHASIS],
		}),
		name: 'info',
		title: 'Info',
	});

const checkboxes = () =>
	fragmentField({
		name: 'checkboxes',
		type: 'array',
		title: 'Checkboxes',
		of: [checkbox()],
	});

const checkbox = () =>
	fragmentField({
		name: 'checkbox',
		type: 'object',
		title: 'Checkbox',
		fields: [reason(), checkText()],
	});

const reason = () =>
	fragmentField({
		name: 'reason',
		type: 'string',
		title: 'Årsak',
		validation: (Rule) => Rule.required(),
	});

const checkText = () =>
	fragmentField({
		name: 'checkText',
		type: 'string',
		title: 'OK-Tekst',
		validation: (Rule) => Rule.required(),
	});

const confirmText = () =>
	fragmentField({
		name: 'confirmText',
		type: 'string',
		title: 'Bekreftelsestekst',
		validation: (Rule) => Rule.required(),
	});

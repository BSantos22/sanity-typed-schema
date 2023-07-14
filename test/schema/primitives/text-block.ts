import {fragmentField} from 'src/schema';
import type {PortableTextArgs} from 'test/schema/primitives/portable-text';
import {portableText} from 'test/schema/primitives/portable-text';

export const textBlock = (args?: PortableTextArgs) =>
	fragmentField({
		name: 'textBlock',
		title: 'Innhold',
		type: 'object',
		fields: [annotation(), title(), content(args)],
		preview: {
			select: {
				annotation: 'annotation',
				title: 'title',
			},
			prepare: (select) => ({
				title: select.annotation ?? select.title ?? 'Innholdsblokk',
				subtitle: (select.annotation || select.title) && 'Innholdsblokk',
			}),
		},
	});

const annotation = () =>
	fragmentField({
		name: 'annotation',
		title: 'Annotering',
		type: 'string',
	});

const title = () =>
	fragmentField({
		name: 'title',
		title: 'Tittel',
		type: 'string',
	});

const content = (args?: PortableTextArgs) =>
	fragmentField({
		...portableText(args),
		name: 'content',
		title: 'Innhold',
	});

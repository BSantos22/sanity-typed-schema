import {fragmentField} from 'src/schema';
import {textBlock} from 'test/schema/primitives/text-block.test';
import {
	BIG_TEXT,
	BULLET,
	EMPHASIS,
	FOOTNOTE,
	H3,
	H4,
	H5,
	H6,
	LINK,
	NUMBERED,
	STRONG,
} from 'test/schema/primitives/portable-text.test';

export const services = () =>
	fragmentField({
		name: 'services',
		title: 'Tjenester',
		type: 'object',
		fields: [text()],
		preview: {
			select: {
				annotation: 'textBlock.annotation',
				title: 'textBlock.title',
			},
			prepare: (select) => ({
				title: select.annotation ?? select.title,
				subtitle: 'Tjenester',
			}),
		},
	});

const text = () =>
	textBlock({
		styles: [H3, H4, H5, H6, BIG_TEXT, FOOTNOTE],
		annotations: [LINK],
		lists: [BULLET, NUMBERED],
		decorators: [STRONG, EMPHASIS],
		customTypes: [],
	});

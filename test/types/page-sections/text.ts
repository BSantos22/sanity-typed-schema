import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type TextTest = {
	_type: 'textSection';
	align: 'left' | 'center';
	width: 'normal' | 'narrow';
	content: {
		_type: 'content';
		annotation: string;
		title: string;
		content: PortableTextTest;
	};
	theme: ThemeTest;
};

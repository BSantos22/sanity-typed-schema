import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type TextTest = {
	align?: 'left' | 'center';
	width?: 'normal' | 'narrow';
	content?: {
		annotation?: string;
		title?: string;
		content?: PortableTextTest;
	};
	theme?: ThemeTest;
};

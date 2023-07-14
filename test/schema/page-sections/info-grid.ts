import type {ImageWebTestAltText} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type InfoGridTest = {
	title?: string;
	items?: {
		_type: 'item';
		_key: string;
		title?: string;
		image?: ImageWebTestAltText;
		content?: PortableTextTest;
	}[];
	theme?: ThemeTest;
};

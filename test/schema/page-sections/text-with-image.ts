import type {IconTest} from '../primitives/icon';
import type {ImageWebTestAltText} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type TextWithImageTest = {
	content?: {
		annotation?: string;
		title?: string;
		content?: PortableTextTest;
	};
	backgroundIcon?: IconTest;
	imageSide?: 'left' | 'right';
	image?: ImageWebTestAltText;
	theme?: ThemeTest;
};

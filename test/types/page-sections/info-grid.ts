import type {ImageWebTestAltText} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type InfoGridTest = {
	_type: 'infoGrid';
	title: string;
	items: {
		_type: 'item';
		title: string;
		image: ImageWebTestAltText;
		content: PortableTextTest;
	}[];
	theme: ThemeTest;
};

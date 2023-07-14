import type {ImageWebTestAltText} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';

export type TyreSelectTest = {
	//_type: 'tyreSelect';
	title?: string;
	summerTyreDates?: {
		start?: {
			month?: number;
			day?: number;
		};
		end?: {
			month?: number;
			day?: number;
		};
	};
	winterTyreDates?: {
		start?: {
			month?: number;
			day?: number;
		};
		end?: {
			month?: number;
			day?: number;
		};
	};
	description?: {
		selected?: PortableTextTest;
		unselected?: PortableTextTest;
	};
	image?: ImageWebTestAltText;
};

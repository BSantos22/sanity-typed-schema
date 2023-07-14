import type {ImageWebTestAltText, ImageWebTestBase} from '../primitives/image-web';
import type {Reference} from '../primitives/reference';

export type SiteSettingsTest = {
	_type: 'siteSettings';
	title?: string;
	frontPage?: Reference;
	headerLinks?: ({_key: string} & Reference)[];
	meta?: {
		description?: string;
		image?: ImageWebTestBase;
	};
	organization?: {
		name?: string;
		number?: string;
		logo?: ImageWebTestAltText;
		creditWorthiness?: ImageWebTestAltText;
	};
	contactInfo?: {
		address?: string;
		postalCode?: string;
		city?: string;
		phone?: string;
		fax?: string;
		email?: string;
		openingHours?: string;
	};
};

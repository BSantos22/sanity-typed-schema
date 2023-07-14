import type {Reference} from '@sanity/types';
import type {ImageWebTestAltText, ImageWebTestBase} from '../primitives/image-web';
import type {SetRequired} from 'type-fest';

export type SiteSettingsTest = {
	_type: 'siteSettings';
	title?: string;
	frontPage?: Reference;
	headerLinks?: SetRequired<Reference, '_key'>[];
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

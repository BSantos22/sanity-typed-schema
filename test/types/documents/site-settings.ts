import type {Reference} from '@sanity/types';
import type {ImageWebTestAltText} from '../primitives/image-web';

export type SiteSettingsTest = {
	_type: 'siteSettings';
	title: string;
	frontPage: Reference;
	headerLinks: Reference[];
	meta: {
		_type: 'meta';
		description: string;
		image: ImageWebTestAltText;
	};
	organization: {
		_type: 'organization';
		name: string;
		number: string;
		logo: ImageWebTestAltText;
		creditWorthiness: ImageWebTestAltText;
	};
	contactInfo: {
		_type: 'contactInfo';
		address: string;
		postalCode: string;
		city: string;
		phone: string;
		fax: string;
		email: string;
		openingHours: string;
	};
};

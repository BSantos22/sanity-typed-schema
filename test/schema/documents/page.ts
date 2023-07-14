import type {ArticleListAllTest} from '../page-sections/article-list-all';
import type {CardLinksTest} from '../page-sections/card-links';
import type {ContactTest} from '../page-sections/contact';
import type {HeadingTest} from '../page-sections/heading';
import type {InfoGridTest} from '../page-sections/info-grid';
import type {LicensePlateTest} from '../page-sections/license-plate';
import type {ServicesTest} from '../page-sections/services';
import type {SupplierSectionTest} from '../page-sections/supplier';
import type {TextTest} from '../page-sections/text';
import type {TextWithImageTest} from '../page-sections/text-with-image';
import type {TwoColumnTest} from '../page-sections/two-column';
import type {TyreSelectTest} from '../page-sections/tyre-select';

export type PageTest = {
	_type: 'page';
	title?: string;
	slug?: {
		_type: 'slug';
		current?: string;
	};
	heading?: HeadingTest;
	content?: (
		| ({_type: 'articleListAll'; _key: string} & ArticleListAllTest)
		| ({_type: 'cardLinks'; _key: string} & CardLinksTest)
		| ({_type: 'contact'; _key: string} & ContactTest)
		| ({_type: 'infoGrid'; _key: string} & InfoGridTest)
		| ({_type: 'licensePlate'; _key: string} & LicensePlateTest)
		| ({_type: 'services'; _key: string} & ServicesTest)
		| ({_type: 'supplierSection'; _key: string} & SupplierSectionTest)
		| ({_type: 'textSection'; _key: string} & TextTest)
		| ({_type: 'textWithImage'; _key: string} & TextWithImageTest)
		| ({_type: 'twoColumn'; _key: string} & TwoColumnTest)
		| ({_type: 'tyreSelect'; _key: string} & TyreSelectTest)
	)[];
};

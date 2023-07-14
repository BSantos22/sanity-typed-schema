import type {Simplify} from 'type-fest';
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
		| Simplify<{_type: 'articleListAll'; _key: string} & ArticleListAllTest>
		| Simplify<{_type: 'cardLinks'; _key: string} & CardLinksTest>
		| Simplify<{_type: 'contact'; _key: string} & ContactTest>
		| Simplify<{_type: 'infoGrid'; _key: string} & InfoGridTest>
		| Simplify<{_type: 'licensePlate'; _key: string} & LicensePlateTest>
		| Simplify<{_type: 'services'; _key: string} & ServicesTest>
		| Simplify<{_type: 'supplierSection'; _key: string} & SupplierSectionTest>
		| Simplify<{_type: 'textSection'; _key: string} & TextTest>
		| Simplify<{_type: 'textWithImage'; _key: string} & TextWithImageTest>
		| Simplify<{_type: 'twoColumn'; _key: string} & TwoColumnTest>
		| Simplify<{_type: 'tyreSelect'; _key: string} & TyreSelectTest>
	)[];
};

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
	title: string;
	slug: {
		_type: 'slug';
		current?: string;
	};
	heading: HeadingTest;
	content: (
		| ArticleListAllTest
		| CardLinksTest
		| ContactTest
		| InfoGridTest
		| LicensePlateTest
		| ServicesTest
		| SupplierSectionTest
		| TextTest
		| TextWithImageTest
		| TwoColumnTest
		| TyreSelectTest
	)[];
};

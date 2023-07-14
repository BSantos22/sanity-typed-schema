import type {ImageWebTestBase} from '../primitives/image-web';

export type SupplierTest = {
	_type: 'supplier';
	name?: string;
	id?: string;
	logo?: ImageWebTestBase;
};

import type {ImageWebTestBase} from '../primitives/image-web';

export type SupplierTest = {
	_type: 'supplier';
	_id: string;
	_createdAt?: string;
	_updatedAt?: string;
	_rev?: string;
	name?: string;
	id?: string;
	logo?: ImageWebTestBase;
};

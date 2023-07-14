import type {Reference} from '@sanity/types';
import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type SupplierSectionTest = {
	//_type: 'supplierSection';
	supplier?: Reference;
	content?: PortableTextTest;
	theme?: ThemeTest;
};

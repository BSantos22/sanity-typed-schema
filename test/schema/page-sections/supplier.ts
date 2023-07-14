import type {PortableTextTest} from '../primitives/portable-text';
import type {Reference} from '../primitives/reference';
import type {ThemeTest} from '../primitives/theme';

export type SupplierSectionTest = {
	supplier?: Reference;
	content?: PortableTextTest;
	theme?: ThemeTest;
};

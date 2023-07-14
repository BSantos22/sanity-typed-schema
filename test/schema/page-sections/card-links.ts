import type {Reference} from '@sanity/types';
import type {IconTest} from '../primitives/icon';
import type {PortableTextTest} from '../primitives/portable-text';

export type CardLinksTest = {
	//_type: 'cardLinks';
	links?: {
		_type: 'link';
		_key: string;
		type?: 'internal' | 'external';
		reference?: Reference;
		query?: string;
		href?: string;
		targetBlank?: boolean;
		icon?: IconTest;
		title?: string;
		content?: PortableTextTest;
		supplier?: Reference;
	}[];
};

import type {Reference} from '@sanity/types';

export type LinkTest = {
	_type: 'link';
	type: 'internal' | 'external';
	reference: Reference;
	query: string;
	href: string;
	targetBlank: boolean;
};

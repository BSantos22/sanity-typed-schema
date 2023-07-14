import type {Reference} from './reference';

export type LinkTest = {
	//_type: 'link';
	type?: 'internal' | 'external';
	reference?: Reference;
	query?: string;
	href?: string;
	targetBlank?: boolean;
};

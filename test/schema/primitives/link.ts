import type {Reference} from './reference';

export type LinkTest = {
	type?: 'internal' | 'external';
	reference?: Reference;
	query?: string;
	href?: string;
	targetBlank?: boolean;
};

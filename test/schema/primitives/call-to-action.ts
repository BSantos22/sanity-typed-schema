import type {Reference} from './reference';

export type CallToActionTest = {
	text?: string;
	type?: 'internal' | 'external';
	reference?: Reference;
	query?: string;
	href?: string;
	targetBlank?: boolean;
};

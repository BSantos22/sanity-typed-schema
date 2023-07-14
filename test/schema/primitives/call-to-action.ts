import type {Reference} from '@sanity/types';

export type CallToActionTest = {
	//_type: 'callToAction';
	text?: string;
	type?: 'internal' | 'external';
	reference?: Reference;
	query?: string;
	href?: string;
	targetBlank?: boolean;
};

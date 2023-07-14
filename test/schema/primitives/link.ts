import type {Reference} from '@sanity/types';
import type {Simplify} from 'type-fest';

export type LinkTest = {
	//_type: 'link';
	type?: 'internal' | 'external';
	reference?: Simplify<Reference>;
	query?: string;
	href?: string;
	targetBlank?: boolean;
};

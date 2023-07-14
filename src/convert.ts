import type {Simplify} from 'type-fest';
import type {FragmentDefinition} from './types-schema';
import type {OutputType} from './types-output';

// This can eventually become a wrapper for fetching from Sanity
export const toOutput = <T extends FragmentDefinition>(value: T): Simplify<OutputType<T>> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return value as any;
};

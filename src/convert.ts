import type {Simplify} from 'type-fest';
import type {FragmentDefinition} from './types-schema';
import type {OutputType} from './types-output';

export const toOutput = <T extends FragmentDefinition>(value: T): Simplify<OutputType<T>> => {
	return value as any;
};

import type {PortableTextBlock} from '@portabletext/types';
import type {SetOptional, SetRequired, Simplify} from 'type-fest';

export type PortableTextTest = Simplify<
	{_type: 'block'} & SetRequired<SetOptional<PortableTextBlock, 'children'>, '_key'>
>[];

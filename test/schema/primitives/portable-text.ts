import type {PortableTextBlock} from '@portabletext/types';
import type {SetOptional, SetRequired} from 'type-fest';

export type PortableTextTest = ({_type: 'block'} & SetRequired<
	SetOptional<PortableTextBlock, 'children'>,
	'_key'
>)[];

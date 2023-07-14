import type {PortableTextBlock} from '@portabletext/types';
import type {SetOptional} from 'type-fest';

export type PortableTextTest = ({_type: 'block'} & SetOptional<PortableTextBlock, 'children'>)[];

import type {Reference} from '@sanity/types';
import type {PortableTextTest} from '../primitives/portable-text';

export type TyreTest = {
	_type: 'tyre';
	brand?: Reference;
	model?: string;
	type?: string;
	description?: PortableTextTest;
	variants?: {
		_type: 'tyreVariant';
		_key: string;
		id?: string;
		season?: 'summer' | 'winter';
		spiked?: 'spiked' | 'spikeless';
		dimensions?: {
			width?: number;
			profile?: number;
			diameter?: number;
		};
		inStock?: boolean;
		price?: number;
		speedIndex?: string;
		loadIndex?: number;
		campaignDiscount?: number;
		active?: boolean;
	}[];
	active?: boolean;
};

import type {PortableTextTest} from '../primitives/portable-text';
import type {Reference} from '../primitives/reference';

export type TyreTest = {
	_type: 'tyre';
	_id: string;
	_createdAt?: string;
	_updatedAt?: string;
	_rev?: string;
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

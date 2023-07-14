import type {PortableTextTest} from '../primitives/portable-text';

export type ServiceTest = {
	_type: 'service';
	name?: string;
	description?: PortableTextTest;
	packages?: {
		_type: 'package';
		_key: string;
		name?: string;
		description?: PortableTextTest;
		price?: PortableTextTest;
	}[];
	individualPrices?: {
		_type: 'individualPrice';
		_key: string;
		description?: PortableTextTest;
		price?: PortableTextTest;
	}[];
	addons?: {
		_type: 'addon';
		_key: string;
		description?: PortableTextTest;
		price?: PortableTextTest;
	}[];
	extraInformation?: PortableTextTest;
};

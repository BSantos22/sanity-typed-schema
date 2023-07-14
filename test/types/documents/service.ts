import type {PortableTextTest} from '../primitives/portable-text';

export type ServiceTest = {
	_type: 'service';
	name: string;
	description: PortableTextTest;
	packages: {
		_type: 'package';
		name: string;
		description: PortableTextTest;
		price: PortableTextTest;
	}[];
	individualPrices: {
		_type: 'individualPrice';
		description: PortableTextTest;
		price: PortableTextTest;
	}[];
	addons: {
		_type: 'addon';
		description: PortableTextTest;
		price: PortableTextTest;
	}[];
	extraInformation: PortableTextTest;
};

import type {Reference} from '@sanity/types';

export type ImageWebTestBase = {
	_type: 'image';
	asset: Reference;
	hotspot: {
		_type?: 'sanity.imageHotspot';
		width: number;
		height: number;
		x: number;
		y: number;
	};
};

export type ImageWebTestAltText = {
	_type: 'image';
	asset: Reference;
	hotspot: {
		_type?: 'sanity.imageHotspot';
		width: number;
		height: number;
		x: number;
		y: number;
	};
	altText: string;
};

export type ImageWebTestAltTextCaption = {
	_type: 'image';
	asset: Reference;
	hotspot: {
		_type?: 'sanity.imageHotspot';
		width: number;
		height: number;
		x: number;
		y: number;
	};
	altText: string;
	caption: string;
};

export type ImageWebTestAll = {
	_type: 'image';
	asset: Reference;
	hotspot: {
		_type?: 'sanity.imageHotspot';
		width: number;
		height: number;
		x: number;
		y: number;
	};
	altText: string;
	caption: string;
	credit: string;
	width: number;
};

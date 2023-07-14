import type {Reference} from '@sanity/types';
import type {Simplify} from 'type-fest';

export type ImageWebTestBase = {
	//_type: 'image';
	asset?: Simplify<Reference>;
	hotspot?: {
		_type: 'sanity.imageHotspot';
		width?: number;
		height?: number;
		x?: number;
		y?: number;
	};
	crop?: {
		_type: 'sanity.imageCrop';
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
};

export type ImageWebTestAltText = {
	//_type: 'image';
	asset?: Simplify<Reference>;
	hotspot?: {
		_type: 'sanity.imageHotspot';
		width?: number;
		height?: number;
		x?: number;
		y?: number;
	};
	crop?: {
		_type: 'sanity.imageCrop';
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
	altText?: string;
};

export type ImageWebTestAltTextCaption = {
	//_type: 'image';
	asset?: Simplify<Reference>;
	hotspot?: {
		_type: 'sanity.imageHotspot';
		width?: number;
		height?: number;
		x?: number;
		y?: number;
	};
	crop?: {
		_type: 'sanity.imageCrop';
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
	altText?: string;
	caption?: string;
};

export type ImageWebTestAll = {
	//_type: 'image';
	asset?: Simplify<Reference>;
	hotspot?: {
		_type: 'sanity.imageHotspot';
		width?: number;
		height?: number;
		x?: number;
		y?: number;
	};
	crop?: {
		_type: 'sanity.imageCrop';
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
	altText?: string;
	caption?: string;
	credit?: string;
	width?: number;
};

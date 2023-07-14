import type {ImageWebTestAltText} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';

export type TyreSelectTest = {
	_type: 'tyreSelect';
	title: string;
	summerTyreDates: {
		_type: 'summerTyreDates';
		start: {
			_type: 'start';
			month: number;
			day: number;
		};
		end: {
			_type: 'end';
			month: number;
			day: number;
		};
	};
	winterTyreDates: {
		_type: 'winterTyreDates';
		start: {
			_type: 'start';
			month: number;
			day: number;
		};
		end: {
			_type: 'end';
			month: number;
			day: number;
		};
	};
	description: {
		_type: 'description';
		selected: PortableTextTest;
		unselected: PortableTextTest;
	};
	image: ImageWebTestAltText;
};

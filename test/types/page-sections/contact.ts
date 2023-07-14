import type {PortableTextTest} from '../primitives/portable-text';

export type ContactTest = {
	_type: 'contact';
	forms: {
		_type: 'form';
		type: string;
		id: string;
		text: {
			_type: 'text';
			annotation: string;
			title: string;
			content: PortableTextTest;
		};
		fields: {
			_type: 'field';
			label: string;
			placeholder: string;
			isTextarea: boolean;
			isRequired: boolean;
			info: PortableTextTest;
		}[];
		checkboxes: {
			_type: 'checkbox';
			reason: string;
			checkText: string;
		}[];
		confirmText: string;
	}[];
	location: {
		_type: 'location';
		annotation: string;
		title: string;
		content: PortableTextTest;
	};
};

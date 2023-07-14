import type {PortableTextTest} from '../primitives/portable-text';

export type ContactTest = {
	forms?: {
		_type: 'form';
		_key: string;
		type?: string;
		id?: string;
		text?: {
			annotation?: string;
			title?: string;
			content?: PortableTextTest;
		};
		fields?: {
			_type: 'field';
			_key: string;
			label?: string;
			placeholder?: string;
			isTextarea?: boolean;
			isRequired?: boolean;
			info?: PortableTextTest;
		}[];
		checkboxes?: {
			_type: 'checkbox';
			_key: string;
			reason?: string;
			checkText?: string;
		}[];
		confirmText?: string;
	}[];
	location?: {
		annotation?: string;
		title?: string;
		content?: PortableTextTest;
	};
};

import type {ImageWebTestAltText, ImageWebTestBase} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';

export type HeadingTest = (
	| {
			_type: 'textHeading';
			title: string;
			backgroundImage: ImageWebTestBase;
	  }
	| {
			_type: 'hero';
			title: string;
			mainImage: ImageWebTestAltText;
			backgroundImage: ImageWebTestBase;
			content: PortableTextTest;
	  }
)[];

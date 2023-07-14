import type {ImageWebTestAltText} from 'test/schema/primitives/image-web';
import type {PortableTextTest} from 'test/schema/primitives/portable-text';
import type {SlugTest} from 'test/schema/primitives/slug';

export type ArticleTest = {
	_type: 'article';
	title?: string;
	slug?: SlugTest;
	image?: ImageWebTestAltText;
	content?: PortableTextTest;
};

import type {ImageWebTestAltText} from '../primitives/image-web';
import type {PortableTextTest} from '../primitives/portable-text';
import type {SlugTest} from '../primitives/slug';

export type ArticleTest = {
	_type: 'article';
	title: string;
	slug: SlugTest;
	image: ImageWebTestAltText;
	content: PortableTextTest;
};

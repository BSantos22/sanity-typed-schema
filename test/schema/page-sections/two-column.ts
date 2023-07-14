import type {PortableTextTest} from '../primitives/portable-text';
import type {ThemeTest} from '../primitives/theme';

export type TwoColumnTest = {
	title?: string;
	titleInvisible?: boolean;
	left?: PortableTextTest;
	right?: PortableTextTest;
	align?: 'left' | 'center';
	theme?: ThemeTest;
};

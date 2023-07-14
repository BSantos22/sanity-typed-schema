import {main} from 'src';
import {describe, expect, it} from 'vitest';

describe('ts-script-starter', () => {
	it('main', async () => {
		expect(main()).toEqual(1);
	});
});

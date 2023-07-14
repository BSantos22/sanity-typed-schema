import {fragmentField} from 'src/schema';

export const icon = () =>
	fragmentField({
		title: 'Ikon',
		name: 'icon',
		type: 'string',
		options: {
			list: [
				{title: 'Bilglass', value: 'car-glass'},
				{title: 'Dekk', value: 'tyres'},
				{title: 'Bilverksted', value: 'services'},
				{title: 'Vei', value: 'road'},
				{title: 'Elbil', value: 'e-car'},
				{title: 'Steinsprut', value: 'crack'},
			],
		},
	});

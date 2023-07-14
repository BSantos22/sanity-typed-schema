import type {Reference} from '@sanity/types';
import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test';
import {describe, expectTypeOf, it} from 'vitest';

export const siteSettings = () =>
	fragmentType({
		name: 'siteSettings',
		type: 'document',
		title: 'Instillinger for nettstedet',
		fields: [title(), organization(), contactInfo(), frontPage(), headerLinks(), meta()],
		preview: {
			prepare: () => ({
				title: 'Instillinger for nettstedet',
			}),
		},
	});

const title = () =>
	fragmentField({
		name: 'title',
		type: 'string',
		title: 'Nettstedsnavn',
		validation: (Rule) => Rule.required(),
	});

const frontPage = () =>
	fragmentField({
		name: 'frontPage',
		type: 'reference',
		title: 'Forside',
		to: [{type: 'page'}],
		validation: (Rule) => Rule.required(),
	});

const headerLinks = () =>
	fragmentField({
		name: 'headerLinks',
		type: 'array',
		title: 'Header-lenker',
		of: [{type: 'reference', to: [{type: 'page'}]}],
		validation: (Rule) => Rule.required(),
	});

const meta = () =>
	fragmentField({
		name: 'meta',
		type: 'object',
		title: 'Meta-informasjon',
		fields: [metaDescription(), metaImage()],
	});

const metaDescription = () =>
	fragmentField({
		name: 'description',
		type: 'string',
		title: 'Beskrivelse',
	});

const metaImage = () =>
	fragmentField({
		...imageWeb({fields: []}),
		title: 'Meta-bilde',
	});

const organization = () =>
	fragmentField({
		name: 'organization',
		type: 'object',
		title: 'Organisasjon',
		fields: [
			organizationName(),
			organizationNumber(),
			organizationLogo(),
			organizationCreditWorthiness(),
		],
	});

const organizationName = () =>
	fragmentField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const organizationNumber = () =>
	fragmentField({
		name: 'number',
		type: 'string',
		title: 'Nummer',
		validation: (Rule) => Rule.required(),
	});

const organizationLogo = () =>
	fragmentField({
		...imageWeb({fields: [ALT_TEXT]}),
		name: 'logo',
		title: 'Logo',
		validation: (Rule) => Rule.required(),
	});

const organizationCreditWorthiness = () =>
	fragmentField({
		...imageWeb({fields: [ALT_TEXT]}),
		name: 'creditWorthiness',
		title: 'Kredittverdihet',
		validation: (Rule) => Rule.required(),
	});

const contactInfo = () =>
	fragmentField({
		name: 'contactInfo',
		type: 'object',
		title: 'Kontaktinformasjon',
		fields: [address(), postalCode(), city(), phone(), fax(), email(), openingHours()],
	});

const address = () =>
	fragmentField({
		name: 'address',
		type: 'string',
		title: 'Adresse',
		validation: (Rule) => Rule.required(),
	});

const postalCode = () =>
	fragmentField({
		name: 'postalCode',
		type: 'string',
		title: 'Postnummer',
		validation: (Rule) => Rule.required(),
	});

const city = () =>
	fragmentField({
		name: 'city',
		type: 'string',
		title: 'Poststed',
		validation: (Rule) => Rule.required(),
	});

const phone = () =>
	fragmentField({
		name: 'phone',
		type: 'string',
		title: 'Telefon',
		validation: (Rule) => Rule.required(),
	});

const fax = () =>
	fragmentField({
		name: 'fax',
		type: 'string',
		title: 'Fax',
		validation: (Rule) => Rule.required(),
	});

const email = () =>
	fragmentField({
		name: 'email',
		type: 'string',
		title: 'E-post',
		validation: (Rule) => Rule.required(),
	});

const openingHours = () =>
	fragmentField({
		name: 'openingHours',
		type: 'string',
		title: 'Åpningstider',
		validation: (Rule) => Rule.required(),
	});

describe('site-settings', () => {
	it('schema', async () => {
		type Test = {
			_type: 'siteSettings';
			title: string;
			frontPage: Reference;
			headerLinks: Reference[];
			meta: {
				_type: 'meta';
				description: string;
				image: {
					_type: 'image';
					asset: Reference;
					hotspot: {
						_type?: 'sanity.imageHotspot';
						width: number;
						height: number;
						x: number;
						y: number;
					};
				};
			};
			organization: {
				_type: 'organization';
				name: string;
				number: string;
				logo: {
					_type: 'image';
					asset: Reference;
					hotspot: {
						_type?: 'sanity.imageHotspot';
						width: number;
						height: number;
						x: number;
						y: number;
					};
					altText: string;
				};
				creditWorthiness: {
					_type: 'image';
					asset: Reference;
					hotspot: {
						_type?: 'sanity.imageHotspot';
						width: number;
						height: number;
						x: number;
						y: number;
					};
					altText: string;
				};
			};
			contactInfo: {
				_type: 'contactInfo';
				address: string;
				postalCode: string;
				city: string;
				phone: string;
				fax: string;
				email: string;
				openingHours: string;
			};
		};

		const sanitySchema = siteSettings();
		const output = toOutput(sanitySchema);
		expectTypeOf(output).toEqualTypeOf<Test>();
	});
});
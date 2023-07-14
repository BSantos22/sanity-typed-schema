import {toOutput} from 'src/convert';
import {fragmentField, fragmentType} from 'src/schema';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test-d';
import type {SiteSettingsTest} from 'test/schema/documents/site-settings';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

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
		const sanitySchema = siteSettings();
		const output = toOutput(sanitySchema);

		expectTypeOf(output._type).toEqualTypeOf<SiteSettingsTest['_type']>();
		expectTypeOf(output.title).toEqualTypeOf<SiteSettingsTest['title']>();
		expectTypeOf(output.organization).toEqualTypeOf<SiteSettingsTest['organization']>();
		expectTypeOf(output.contactInfo).toEqualTypeOf<SiteSettingsTest['contactInfo']>();
		expectTypeOf(output.frontPage).toEqualTypeOf<SiteSettingsTest['frontPage']>();
		expectTypeOf(output.headerLinks).toEqualTypeOf<SiteSettingsTest['headerLinks']>();
		expectTypeOf(output.meta).toEqualTypeOf<SiteSettingsTest['meta']>();
		expectTypeOf(output).toEqualTypeOf<SiteSettingsTest>();
		expectType<typeof output._type>().toStrictEqual<SiteSettingsTest['_type']>();
		expectType<typeof output.title>().toStrictEqual<SiteSettingsTest['title']>();
		expectType<typeof output.organization>().toStrictEqual<SiteSettingsTest['organization']>();
		expectType<typeof output.contactInfo>().toStrictEqual<SiteSettingsTest['contactInfo']>();
		expectType<typeof output.frontPage>().toStrictEqual<SiteSettingsTest['frontPage']>();
		expectType<typeof output.headerLinks>().toStrictEqual<SiteSettingsTest['headerLinks']>();
		expectType<typeof output.meta>().toStrictEqual<SiteSettingsTest['meta']>();
		expectType<typeof output>().toStrictEqual<SiteSettingsTest>();
	});
});

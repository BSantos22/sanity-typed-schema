import {toOutput} from 'src/convert';
import {defineField, defineType} from 'src/schema';
import {ALT_TEXT, imageWeb} from 'test/schema/primitives/image-web.test-d';
import type {SiteSettingsTest} from 'test/schema/documents/site-settings';
import {describe, expectTypeOf, it} from 'vitest';
import {expectType} from 'test/utils';

export const siteSettings = () =>
	defineType({
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
	defineField({
		name: 'title',
		type: 'string',
		title: 'Nettstedsnavn',
		validation: (Rule) => Rule.required(),
	});

const frontPage = () =>
	defineField({
		name: 'frontPage',
		type: 'reference',
		title: 'Forside',
		to: [{type: 'page'}],
		validation: (Rule) => Rule.required(),
	});

const headerLinks = () =>
	defineField({
		name: 'headerLinks',
		type: 'array',
		title: 'Header-lenker',
		of: [{type: 'reference', to: [{type: 'page'}]}],
		validation: (Rule) => Rule.required(),
	});

const meta = () =>
	defineField({
		name: 'meta',
		type: 'object',
		title: 'Meta-informasjon',
		fields: [metaDescription(), metaImage()],
	});

const metaDescription = () =>
	defineField({
		name: 'description',
		type: 'string',
		title: 'Beskrivelse',
	});

const metaImage = () =>
	defineField({
		...imageWeb({fields: []}),
		title: 'Meta-bilde',
	});

const organization = () =>
	defineField({
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
	defineField({
		name: 'name',
		type: 'string',
		title: 'Navn',
		validation: (Rule) => Rule.required(),
	});

const organizationNumber = () =>
	defineField({
		name: 'number',
		type: 'string',
		title: 'Nummer',
		validation: (Rule) => Rule.required(),
	});

const organizationLogo = () =>
	defineField({
		...imageWeb({fields: [ALT_TEXT]}),
		name: 'logo',
		title: 'Logo',
		validation: (Rule) => Rule.required(),
	});

const organizationCreditWorthiness = () =>
	defineField({
		...imageWeb({fields: [ALT_TEXT]}),
		name: 'creditWorthiness',
		title: 'Kredittverdihet',
		validation: (Rule) => Rule.required(),
	});

const contactInfo = () =>
	defineField({
		name: 'contactInfo',
		type: 'object',
		title: 'Kontaktinformasjon',
		fields: [address(), postalCode(), city(), phone(), fax(), email(), openingHours()],
	});

const address = () =>
	defineField({
		name: 'address',
		type: 'string',
		title: 'Adresse',
		validation: (Rule) => Rule.required(),
	});

const postalCode = () =>
	defineField({
		name: 'postalCode',
		type: 'string',
		title: 'Postnummer',
		validation: (Rule) => Rule.required(),
	});

const city = () =>
	defineField({
		name: 'city',
		type: 'string',
		title: 'Poststed',
		validation: (Rule) => Rule.required(),
	});

const phone = () =>
	defineField({
		name: 'phone',
		type: 'string',
		title: 'Telefon',
		validation: (Rule) => Rule.required(),
	});

const fax = () =>
	defineField({
		name: 'fax',
		type: 'string',
		title: 'Fax',
		validation: (Rule) => Rule.required(),
	});

const email = () =>
	defineField({
		name: 'email',
		type: 'string',
		title: 'E-post',
		validation: (Rule) => Rule.required(),
	});

const openingHours = () =>
	defineField({
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

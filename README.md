## This plugin is no longer maintained by the author

---

# Sanity CMS

Manage the content of your storefront with Sanity CMS.

## From v1 to v2

I've changed the plugin to use [internationalizedArrayString](https://github.com/sanity-io/sanity-plugin-internationalized-array) instead of `localeString` and `localeBlock` for any fields using that format. This means that you will have to migrate your existing data to the new format if you want to use v2.

## Features

-   Handle the presentational content of your commerce application using Sanity.
-   One-way sync from Medusa to Sanity, allowing you to add additional content through Sanity
-   Benefit from Sanity's advanced CMS features such as localization.

---

## Prerequisites

-   [Sanity account](https://www.sanity.io/)
-   [Sanity File Plugin](https://github.com/abmenzel/medusa-plugin-sanity)

---

## Sanity File Plugin

This plugin assumes that the [Sanity File Plugin](https://github.com/abmenzel/medusa-plugin-sanity) is also being used, as it relies on this functionality for storing images.

---

## How to Install

1\. Copy the schemas from data/schemas to your Sanity project. (You can add to these schemas to suit your needs.)

2\. Run the following command to install the plugin on your Medusa backend:

```bash
yarn add medusa-plugin-sanity
```

3\. Set the following environment variables in `.env`:

```bash
  SANITY_PROJECT_ID=<YOUR_SANITY_PROJECT_ID>
  SANITY_DATASET=<YOUR_SANITY_DATASET>
  SANITY_TOKEN=<YOUR_SANITY_TOKEN>
```

3\. In `medusa-config.js`, :

```js
plugins = [
	//...
	{
		resolve: `medusa-plugin-sanity`,
		options: {
			projectId: process.env.SANITY_PROJECT_ID,
			dataset: process.env.SANITY_DATASET,
			token: process.env.SANITY_TOKEN,
			apiVersion: '2021-10-21',
			useCdn: false, // `false` if you want to ensure fresh data
		},
	},
]
```

---

## Localization

This plugin assumes that you are using Sanity's field-level localization. The Sanity schema that comes with the plugin is already set up to support this. The schema assumes enligsh as the default language, and this is the field that is synced with Medusa.

---

## Synchronization

The plugin will sync the following fields from Medusa to Sanity on creation/update:

-   `title`
-   `subtitle`
-   `description`
-   `handle`
-   `type`
-   `tags`
-   `collection`
-   `thumbnail`
-   `images`
-   `variants`
-   `options`

The plugin will sync the following fields from Sanity to Medusa on update:

-   `title`
-   `subtitle`
-   `handle`
-   `thumbnail`

Deleting a product in Medusa will also delete the corresponding document in Sanity, but not the other way around.

---

## TODO

-   [ ] Add support for automatically creating types in Sanity
-   [ ] Add check for Sanity File Plugin
-   [ ] Add check for correct types in Sanity
-   [ ] Add support for migrating existing medusa product to Sanity

---

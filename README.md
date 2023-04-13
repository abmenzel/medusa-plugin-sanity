# Sanity CMS

Manage the content of your storefront with Sanity CMS.

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

1\. Run the following command to install the plugin on your Medusa backend:

```bash
yarn add medusa-plugin-sanity
```

2\. Set the following environment variables in `.env`:

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

## TODO

-   [ ] Add support for two-way sync
-   [ ] Add support for automatically creating types in Sanity
-   [ ] Add check for Sanity File Plugin
-   [ ] Add check for correct types in Sanity
-   [ ] Add support for migrating existing medusa product to Sanity

---

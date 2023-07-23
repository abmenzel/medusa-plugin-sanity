const product = {
	name: 'product',
	type: 'document',
	title: 'Product',
	fields: [
		{
			name: 'title',
			type: 'internationalizedArrayString',
			title: 'Title',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'handle',
			type: 'string',
			title: 'Handle',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'subtitle',
			type: 'internationalizedArrayString',
			title: 'Subtitle',
		},
		{
			name: 'thumbnail',
			type: 'image',
			title: 'Thumbnail',
		},
		{
			name: 'images',
			type: 'array',
			title: 'Images',
			of: [{ type: 'image' }],
		},
		{
			name: 'description',
			type: 'internationalizedArrayString',
			title: 'Description',
		},
		{
			name: 'options',
			type: 'array',
			title: 'Options',
			of: [{ type: 'string' }],
		},
		{
			name: 'tags',
			type: 'array',
			title: 'Tags',
			of: [{ type: 'string' }],
		},
		{
			name: 'collection',
			type: 'reference',
			title: 'Collection',
			weak: true,
			to: [{ type: 'productCollection' }],
		},
		{
			name: 'type',
			type: 'string',
			title: 'Type',
		},
		{
			name: 'variants',
			type: 'array',
			title: 'Variants',
			of: [
				{
					type: 'reference',
					weak: true,
					to: [{ type: 'productVariant' }],
				},
			],
		},
	],
	preview: {
		select: {
			title: `title.en`,
		},
	},
}

export default product

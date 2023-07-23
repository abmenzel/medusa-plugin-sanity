const productCollection = {
	type: 'document',
	name: 'productCollection',
	title: 'Product Collection',
	fields: [
		{
			name: 'name',
			type: 'internationalizedArrayString',
			title: 'Name',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'handle',
			type: 'string',
			title: 'Handle',
			validation: (Rule: any) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: `name.en`,
		},
	},
}

export default productCollection

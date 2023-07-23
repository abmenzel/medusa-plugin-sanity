const productVariantOption = {
	type: 'object',
	name: 'productVariantOption',
	title: 'Product Variant Option',
	fields: [
		{
			name: 'value',
			type: 'internationalizedArrayString',
			title: 'Value',
		},
		{
			name: 'option_id',
			type: 'string',
			title: 'Option ID',
			readOnly: true,
		},
		{
			name: 'variant_id',
			type: 'string',
			title: 'Variant ID',
			readOnly: true,
		},
	],
}

export default productVariantOption

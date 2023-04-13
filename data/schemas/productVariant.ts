const productVariant = {
  name: 'productVariant',
  type: 'document',
  title: 'Product Variant',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'prices',
      type: 'array',
      title: 'Prices',
      of: [{type: 'productVariantPrice'}],
      readOnly: true,
    },
    {
      name: 'options',
      type: 'array',
      title: 'Options',
      of: [{type: 'productVariantOption'}],
      readOnly: true,
    },
    {
      name: 'sku',
      type: 'string',
      title: 'SKU',
      readOnly: true,
    },
    {
      name: 'inventory_quantity',
      type: 'number',
      title: 'Inventory Quantity',
      readOnly: true,
    },
    {
      name: 'variant_id',
      type: 'string',
      title: 'Variant ID',
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: `title.en`,
    },
  },
}

export default productVariant

const productVariantPrice = {
  name: 'productVariantPrice',
  type: 'object',
  title: 'Product Variant Price',
  fields: [
    {
      name: 'currency_code',
      type: 'string',
      title: 'Currency Code',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'amount',
      type: 'number',
      title: 'Amount',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: `currency_code`,
    },
  },
}

export default productVariantPrice

import { AdminPostCollectionsReq, AdminPostProductsReq } from '@medusajs/medusa'

export const simpleMedusaProduct: AdminPostProductsReq = {
	title: 'Simple Product',
	subtitle: 'Simple Product Subtitle',
	description: 'Simple Product Description',
	tags: [{ value: 'some-tag' }, { value: 'other-tag' }],
	type: { value: 'physical' },
	is_giftcard: false,
	discountable: true,
}

export const productWithImage: AdminPostProductsReq = {
	title: 'Product with image',
	subtitle: 'Product with Image',
	description: 'Description',
	tags: [{ value: 'some-tag' }],
	type: { value: 'physical' },
	is_giftcard: false,
	discountable: true,
	thumbnail: 'https://picsum.photos/200',
	images: ['https://picsum.photos/200'],
}

export const productWithVariants: AdminPostProductsReq = {
	title: 'Product with variants',
	subtitle: 'Product with variants',
	description: 'Description',
	tags: [{ value: 'some-tag' }],
	type: { value: 'physical' },
	is_giftcard: false,
	discountable: true,
	options: [{ title: 'Option 1' }],
	variants: [
		{
			title: 'Variant 1',
			prices: [{ currency_code: 'EUR', amount: 1000 }],
			options: [{ value: 'some-option-1' }],
		},
		{
			title: 'Variant 2',
			prices: [{ currency_code: 'EUR', amount: 1000 }],
			options: [{ value: 'some-option-2' }],
		},
	],
}

export const productWithCollection: AdminPostProductsReq = {
	title: 'Product with collection',
	subtitle: 'Product with collection',
	description: 'Description',
	tags: [{ value: 'some-tag' }],
	type: { value: 'physical' },
	is_giftcard: false,
	discountable: true,
	collection_id: 'some-collection',
}

export const someCollection: AdminPostCollectionsReq = {
	title: 'Some Collection',
	handle: 'some-collection',
}

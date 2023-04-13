import Medusa from '@medusajs/medusa-js'
import { simpleMedusaProduct } from '../__mocks__/mock-products'
import * as dotenv from 'dotenv'
import { createClient } from '@sanity/client'

dotenv.config()
const medusa = new Medusa({
	baseUrl: process.env.BACKEND_URL || '',
	maxRetries: 3,
	apiKey: process.env.BACKEND_API_KEY || '',
})

describe('removes products', () => {
	it('removes all variants', async () => {
		const { variants } = await medusa.admin.variants.list()

		variants.map((variant) => {
			if (variant.id && variant.product_id)
				medusa.admin.products.deleteVariant(
					variant.product_id,
					variant.id
				)
		})
	})
	it('removes all products', async () => {
		const { products } = await medusa.admin.products.list()

		products.map((product) => {
			if (product.id) medusa.admin.products.delete(product.id)
		})
	})

	it('removes all collections', async () => {
		const { collections } = await medusa.admin.collections.list()

		collections.map((collection) => {
			if (collection.id) medusa.admin.collections.delete(collection.id)
		})
	})
})

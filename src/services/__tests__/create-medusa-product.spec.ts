import Medusa from '@medusajs/medusa-js'
import {
	productWithCollection,
	productWithImage,
	productWithVariants,
	simpleMedusaProduct,
	someCollection,
} from '../__mocks__/mock-products'
import * as dotenv from 'dotenv'

dotenv.config()
const medusa = new Medusa({
	baseUrl: process.env.BACKEND_URL || '',
	maxRetries: 3,
	apiKey: process.env.BACKEND_API_KEY || '',
})

describe('creates products', () => {
	it('creates a simple product', async () => {
		try {
			const createdMedusaProduct = await medusa.admin.products.create({
				...simpleMedusaProduct,
			})
			expect(createdMedusaProduct).toHaveProperty('product')
		} catch (error) {
			console.error(error)
			throw error
		}
	})
	it('creates a product with image ', async () => {
		try {
			const createdMedusaProduct = await medusa.admin.products.create({
				...productWithImage,
			})
			expect(createdMedusaProduct).toHaveProperty('product')
		} catch (error) {
			console.error(error)
			throw error
		}
	})
	it('creates a product with variants', async () => {
		try {
			const createdMedusaProduct = await medusa.admin.products.create({
				...productWithVariants,
			})
			expect(createdMedusaProduct).toHaveProperty('product')
		} catch (error) {
			console.error(error)
			throw error
		}
	})
	it('creates a product with a collection', async () => {
		try {
			const { collection } = await medusa.admin.collections.create({
				...someCollection,
			})
			expect(collection).toHaveProperty('id')
			const createdMedusaProduct = await medusa.admin.products.create({
				...productWithCollection,
				collection_id: collection.id,
			})
			expect(createdMedusaProduct).toHaveProperty('product')
		} catch (error) {
			console.error(error)
			throw error
		}
	})
})

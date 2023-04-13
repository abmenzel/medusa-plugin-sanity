import {
	Image,
	ProductCollectionService,
	ProductService,
	ProductVariantService,
} from '@medusajs/medusa'
import { SanityClient, createClient } from '@sanity/client'
import { BaseService } from 'medusa-interfaces'
import { createBlock } from './util/create-block'
import { transformMedusaOptions, transformMedusaPrices } from './util/mappers'
import { parse } from 'path'
import { createImageField } from './util/create-image-field'

class SanityService extends BaseService {
	private productService_: ProductService
	private productVariantService_: ProductVariantService
	private productCollectionService_: ProductCollectionService
	private sanityClient: SanityClient

	constructor(
		{ productService, productCollectionService, productVariantService },
		options
	) {
		super()
		this.productService_ = productService

		this.productVariantService_ = productVariantService

		this.productCollectionService_ = productCollectionService

		this.sanityClient = createClient({
			projectId: options.projectId,
			dataset: options.dataset,
			token: options.token,
			apiVersion: options.apiVersion,
			useCdn: options.useCdn,
		})
	}

	async getAllMedusaProducts() {
		const products = await this.productService_.list({})
		products.map(async (p) => {
			const pp = await this.productService_.retrieve(p.id, {
				relations: ['images'],
			})
			pp.images.map(async (i) => {
				await this.getImageInSanity(i)
			})
		})
		return products
	}

	async getDocumentsOfType(type) {
		const query = `*[_type == '${type}']`
		const documents = await this.sanityClient.fetch(query)
		return documents
	}

	async getImageInSanity(image: Image) {
		const parsedUrl = parse(image.url)
		const parsedId = `image-${parsedUrl.name}${parsedUrl.ext.replace(
			'.',
			'-'
		)}`
		const sanityImage = await this.sanityClient.getDocument(parsedId)
		return sanityImage
	}

	async getImagesInSanity(images: Image[]) {
		const sanityImages = await Promise.all(
			images.map(async (image) => {
				const existingSanityImage = await this.getImageInSanity(image)
				if (existingSanityImage) {
					return existingSanityImage
				} else {
					console.error('Image not found in Sanity')
				}
			})
		)

		return sanityImages
	}

	async createProductInSanity(product) {
		try {
			const medusaProduct = await this.productService_.retrieve(
				product.id,
				{
					relations: [
						'variants',
						'options',
						'tags',
						'type',
						'collection',
						'images',
					],
				}
			)

			const sanityVariants = medusaProduct.variants
				? await Promise.all(
						medusaProduct.variants.map(async (variant) => {
							// Map to variant references
							const sanityVariant =
								await this.createProductVariantInSanity(variant)
							return {
								_key: sanityVariant._id,
								_type: 'reference',
								_ref: sanityVariant._id,
								_weak: true,
							}
						})
				  )
				: []

			const sanityProductFields = {
				_type: 'product',
				_id: medusaProduct.id,
				title: {
					en: medusaProduct.title,
				},
				subtitle: {
					en: medusaProduct.subtitle,
				},
				description: {
					en: medusaProduct.description
						? createBlock(medusaProduct.description)
						: undefined,
				},
				handle: medusaProduct.handle,
				type: medusaProduct.type?.value,
				tags: medusaProduct.tags?.map((tag) => tag.value) || [],
				options:
					medusaProduct.options?.map((option) => option.title) || [],
				variants: sanityVariants,
			}

			if (medusaProduct.collection) {
				sanityProductFields['collection'] = {
					_key: medusaProduct.collection.id,
					_type: 'reference',
					_ref: medusaProduct.collection.id,
					_weak: true,
				}
			}

			if (medusaProduct.images) {
				const sanityImages = await this.getImagesInSanity(
					medusaProduct.images
				)
				if (sanityImages.length > 0) {
					sanityProductFields['thumbnail'] = createImageField(
						sanityImages[0]
					)
					sanityProductFields['images'] = sanityImages.map(
						(image) => {
							return createImageField(image)
						}
					)
				}
			}

			return this.sanityClient.createOrReplace(sanityProductFields)
		} catch (error) {
			throw error
		}
	}

	// TODO: thumbnails
	async updateProductInSanity(product) {
		try {
			const productEntry =
				(await this.sanityClient.getDocument(product.id)) ||
				(await this.createProductInSanity(product))

			const medusaProduct = await this.productService_.retrieve(
				product.id,
				{
					relations: [
						'variants',
						'options',
						'tags',
						'type',
						'collection',
						'images',
					],
				}
			)

			const sanityVariants = medusaProduct.variants
				? await Promise.all(
						medusaProduct.variants.map(async (variant) => {
							// Map to variant references
							const sanityVariant =
								await this.createProductVariantInSanity(variant)
							return {
								_key: sanityVariant._id,
								_type: 'reference',
								_ref: sanityVariant._id,
								_weak: true,
							}
						})
				  )
				: []

			const updatedFields = {
				title: {
					en: medusaProduct.title,
				},
				subtitle: {
					en: medusaProduct.subtitle,
				},
				description: {
					en: createBlock(medusaProduct.description),
				},
				handle: medusaProduct.handle,
				type: medusaProduct.type?.value,
				tags: medusaProduct.tags?.map((tag) => tag.value) || [],
				options:
					medusaProduct.options?.map((option) => option.title) || [],
				variants: sanityVariants,
			}

			if (medusaProduct.collection) {
				updatedFields['collection'] = {
					_key: medusaProduct.collection.id,
					_type: 'reference',
					_ref: medusaProduct.collection.id,
					_weak: true,
				}
			}

			return this.sanityClient
				.patch(productEntry._id)
				.set(updatedFields)
				.commit()
		} catch (error) {
			throw error
		}
	}

	async createProductVariantInSanity(variant) {
		try {
			const medusaVariant = await this.productVariantService_.retrieve(
				variant.id,
				{
					relations: ['prices', 'options'],
				}
			)

			const sanityVariantFields = {
				_type: 'productVariant',
				_id: medusaVariant.id,
				title: {
					en: medusaVariant.title,
				},
				sku: medusaVariant.sku,
				inventory_quantity: medusaVariant.inventory_quantity,
				prices: transformMedusaPrices(medusaVariant.prices),
				options: transformMedusaOptions(
					medusaVariant,
					medusaVariant.options
				),
				variant_id: medusaVariant.id,
			}

			return this.sanityClient.createOrReplace(sanityVariantFields)
		} catch (error) {
			throw error
		}
	}

	async updateProductVariantInSanity(variant) {
		try {
			const variantEntry =
				(await this.sanityClient.getDocument(variant.id)) ||
				(await this.createProductVariantInSanity(variant))

			const medusaVariant = await this.productVariantService_.retrieve(
				variant.id,
				{
					relations: ['prices', 'options'],
				}
			)

			const updatedFields = {
				title: {
					en: medusaVariant.title,
				},
				sku: medusaVariant.sku,
				inventory_quantity: medusaVariant.inventory_quantity,
				prices: transformMedusaPrices(medusaVariant.prices),
				options: transformMedusaOptions(
					medusaVariant,
					medusaVariant.options
				),
			}

			return this.sanityClient
				.patch(variantEntry._id)
				.set(updatedFields)
				.commit()
		} catch (error) {
			throw error
		}
	}

	async deleteDocumentInSanity(document) {
		try {
			await this.sanityClient.delete(document.id)
		} catch (error) {
			throw error
		}
	}

	async createCollectionInSanity(collection) {
		try {
			const medusaCollection =
				await this.productCollectionService_.retrieve(collection.id)

			const sanityCollection = await this.sanityClient.createOrReplace({
				_type: 'productCollection',
				_id: collection.id,
				name: {
					en: medusaCollection.title,
				},
				handle: medusaCollection.handle,
			})

			return sanityCollection
		} catch (error) {
			throw error
		}
	}

	async updateCollectionInSanity(collection) {
		try {
			const medusaCollection =
				await this.productCollectionService_.retrieve(collection.id)

			const existingCollection =
				(await this.sanityClient.getDocument(medusaCollection.id)) ||
				(await this.createCollectionInSanity(medusaCollection))

			return this.sanityClient
				.patch(existingCollection._id)
				.set({
					name: {
						en: medusaCollection.title,
					},
					handle: medusaCollection.handle,
				})
				.commit()
		} catch (error) {
			throw error
		}
	}
}

export default SanityService

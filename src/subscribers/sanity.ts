import { EventBusService, ProductVariantService } from '@medusajs/medusa'
import SanityService from 'services/sanity'

class SanitySubscriber {
	private sanityService_: SanityService
	private eventBus_: EventBusService

	constructor({ sanityService, eventBusService }) {
		this.sanityService_ = sanityService
		this.eventBus_ = eventBusService

		this.eventBus_.subscribe('product-variant.created', async (data) => {
			await this.sanityService_.createProductVariantInSanity(data)
		})

		this.eventBus_.subscribe('product-variant.updated', async (data) => {
			await this.sanityService_.updateProductVariantInSanity(data)
		})

		this.eventBus_.subscribe('product-variant.deleted', async (data) => {
			await this.sanityService_.deleteDocumentInSanity(data)
		})

		this.eventBus_.subscribe('product.created', async (data) => {
			await this.sanityService_.createProductInSanity(data)
		})

		this.eventBus_.subscribe('product.updated', async (data) => {
			await this.sanityService_.updateProductInSanity(data)
		})

		this.eventBus_.subscribe('product.deleted', async (data) => {
			await this.sanityService_.deleteDocumentInSanity(data)
		})

		this.eventBus_.subscribe('product-collection.created', async (data) => {
			await this.sanityService_.createCollectionInSanity(data)
		})

		this.eventBus_.subscribe('product-collection.updated', async (data) => {
			await this.sanityService_.updateCollectionInSanity(data)
		})

		this.eventBus_.subscribe('product-collection.deleted', async (data) => {
			await this.sanityService_.deleteDocumentInSanity(data)
		})
	}
}
export default SanitySubscriber

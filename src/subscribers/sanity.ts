import { EventBusService } from '@medusajs/medusa'
import SanityService from 'services/sanity'

class SanitySubscriber {
	private sanityService_: SanityService
	private eventBus_: EventBusService

	constructor({ sanityService, eventBusService }) {
		this.sanityService_ = sanityService
		this.eventBus_ = eventBusService

		// Medusa -> Sanity sync

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

		// Sanity -> Medusa sync

		this.sanityService_
			.getClient()
			.listen('*[_type == "product"]')
			.subscribe((update: any) => {
				this.sanityService_.handleSanityProductUpdate(update)
			})
	}
}
export default SanitySubscriber

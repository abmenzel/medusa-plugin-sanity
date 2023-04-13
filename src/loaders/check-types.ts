const checkContentTypes = async (container) => {
	const sanityService = container.resolve('sanityService')
	const products = await sanityService.getDocumentsOfType('product')
	console.log(products)
	products.map((p) => {
		console.log(p)
		console.log(p.thumbnail)
	})
	//const images = await sanityService.getDocumentsOfType('sanity.imageAsset')
	const t = await sanityService.getAllMedusaProducts()
	/*t.forEach((i) => {
		console.log(i.title)
		console.log(i.images)
		console.log(i.thumbnail)
		console.log()
	})*/
}

export default checkContentTypes

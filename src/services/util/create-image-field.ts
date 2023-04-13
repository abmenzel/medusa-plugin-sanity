export const createImageField = (image) => ({
	_key: image._id,
	_type: 'image',
	asset: {
		_type: 'reference',
		_ref: image._id,
	},
})

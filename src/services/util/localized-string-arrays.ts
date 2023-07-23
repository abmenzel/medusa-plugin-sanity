export const updateLocalizedStringArray = (
	currentValue: any,
	newValue: string
) => {
	return Array.isArray(currentValue)
		? currentValue.map((t) => {
				if (t._key === 'en') {
					return {
						...t,
						value: newValue,
					}
				} else {
					return t
				}
		  })
		: [
				{
					_key: 'en',
					value: newValue,
				},
		  ]
}

export const createLocalizedStringArray = (value: string) => {
	return [
		{
			_key: 'en',
			value,
		},
	]
}

export const mapUpdateToMedusa = (updatedField: any) => {
	if (Array.isArray(updatedField)) {
		const en = updatedField.find((t) => t._key === 'en')
		if (en && en.value) {
			return en.value
		}
	}
	return undefined
}

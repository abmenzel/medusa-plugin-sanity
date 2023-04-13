export const createBlock = (text: string) => [
	{
		_key: '1',
		style: 'normal',
		_type: 'block',
		markDefs: [],
		children: [
			{
				_type: 'span',
				_key: '1',
				text: text,
				marks: [],
			},
		],
	},
]

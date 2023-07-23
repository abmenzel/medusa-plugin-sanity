import {
	MoneyAmount,
	ProductOptionValue,
	ProductVariant,
} from '@medusajs/medusa'
import { createLocalizedStringArray } from './localized-string-arrays'

export const transformMedusaPrices = (prices: MoneyAmount[]) =>
	prices.map((price) => ({
		_key: price.id,
		currency_code: price.currency_code,
		amount: price.amount,
	}))

export const transformMedusaOptions = (
	variant: ProductVariant,
	options: ProductOptionValue[]
) =>
	options.map((option) => ({
		_key: option.id,
		value: createLocalizedStringArray(option.value),
		option_id: option.id,
		variant_id: variant.id,
	}))

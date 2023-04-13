import {supportedLanguages} from '../locales/languages'

const localeBlock = {
  title: 'Localized block',
  name: 'localeBlock',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'array',
    of: [{type: 'block'}],
    fieldset: lang.isDefault ? null : 'translations',
  })),
}

export default localeBlock

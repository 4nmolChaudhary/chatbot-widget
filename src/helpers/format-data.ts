import { camelCase, transform } from 'lodash'

type Item = {
  created_at: string
  group: string
  id: number
  is_visible: boolean
  key: string
  updated_at: string
  url: string | null
  uuid: string
  value: any
}

type OutputValue = {
  visible: boolean
  value: any
}

type OutputGroup = {
  [key: string]: OutputGroup | OutputValue
}

export type Output = {
  [group: string]: OutputGroup
}

export const transformSettings = (data: Item[]): Output => {
  return transform(
    data,
    (acc: Output, item: Item) => {
      const group = item.group
      if (!acc[group]) acc[group] = {}
      const parts = item.key.split('.').map(p => camelCase(p))
      let pointer: OutputGroup = acc[group]
      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1
        if (isLast) {
          pointer[part] = {
            visible: item.is_visible,
            value: item.value,
          }
        } else {
          if (!pointer[part] || typeof pointer[part] !== 'object') {
            pointer[part] = {}
          }
          pointer = pointer[part] as OutputGroup
        }
      })
    },
    {} as Output
  )
}

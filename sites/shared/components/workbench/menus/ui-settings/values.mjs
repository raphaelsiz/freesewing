import { Difficulty } from 'shared/components/designs/difficulty.mjs'
import { ListValue } from '../shared/values.mjs'

export const values = {
  control: ({ control }) => <Difficulty score={control} color="primary" />,
  kiosk: ListValue,
  renderer: ListValue,
}

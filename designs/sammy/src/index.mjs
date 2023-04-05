//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { side } from './side.mjs'

// Create new design
const Sammy = new Design({
  data,
  parts: [side],
})

// Named exports
export { side, Sammy }

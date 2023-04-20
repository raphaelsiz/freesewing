//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { frontWall } from './frontWall.mjs'
import { backWall } from './backWall.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'

// Create new design
const Hubbie = new Design({
  data,
  parts: [frontWall, backWall, front, back],
})

// Named exports
export { frontWall, backWall, front, back, Hubbie }

import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBox({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  const diameter = 250 * options.size
  const height = diameter * options.length
  const width = diameter * Math.PI
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.bottomLeft = new Point(0, height)
  points.bottomRight = new Point(width, height)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, w / 8)
      .attr('data-text', 'Front Wall')
      .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const frontWall = {
  name: 'frontWall',
  options: {
    thickness: { pct: 50, min: 10, max: 100, menu: 'style' },
    length: { pct: 100, min: 60, max: 120, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftBox,
}

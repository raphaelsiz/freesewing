import { pluginBundle } from '@freesewing/plugin-bundle'

function draftCircle({
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
  const radius = 225 * options.thickness
  points.top = new Point(0, -radius)
  points.topLeft = new Point(-radius, -radius)
  points.left = new Point(-radius, 0)
  points.bottomLeft = new Point(-radius, radius)
  points.bottom = new Point(0, radius)
  points.bottomRight = new Point(radius, radius)
  points.right = new Point(radius, 0)
  points.topRight = new Point(radius, -radius)
  macro('round', {
    from: points.top,
    to: points.left,
    via: points.topLeft,
    prefix: 'topLeft',
    hide: false,
  })
  macro('round', {
    from: points.left,
    to: points.bottom,
    via: points.bottomLeft,
    prefix: 'bottomLeft',
    hide: false,
  })
  macro('round', {
    from: points.bottom,
    to: points.right,
    via: points.bottomRight,
    prefix: 'bottomRight',
    hide: false,
  })
  macro('round', {
    from: points.right,
    to: points.top,
    via: points.topRight,
    prefix: 'topRight',
    hide: false,
  })
  paths.seam = new Path()
    .move(points.topLeftStart)
    .curve(points.topLeftCp1, points.topLeftCp2, points.topLeftEnd)
    .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
    .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
    .curve(points.topRightCp1, points.topRightCp2, points.topRightEnd)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    points.logo = points.left.shiftFractionTowards(points.right, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, radius / 4)
      .attr('data-text', 'Back')
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

export const back = {
  name: 'back',
  options: {
    thickness: { pct: 50, min: 10, max: 100, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftCircle,
}

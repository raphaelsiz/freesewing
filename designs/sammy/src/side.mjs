import { pluginBundle } from '@freesewing/plugin-bundle'

function draftSide({
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
  measurements,
  part,
}) {
  const height = options.length * measurements.heel
  points.topBack = new Point(0, height)
  points.topFront = new Point(
    Math.max(measurements.ankle * 0.4, measurements.heel * 0.3),
    height * 1.05
  )
  let hyp = Math.sqrt(2) * measurements.heel * 0.3 //sides of triangle with heel measurement as hypotenuse
  points.frontHeel = new Point(hyp, hyp)
  points.bottomBack = new Point(0, 0)
  points.bottomFront = new Point(measurements.footLength * 0.8, 0)
  points.toeFront = new Point(measurements.footLength * 0.8, measurements.foot * 0.2)
  points.toeFrontCp2 = new Point(
    Math.max(hyp * 1.3, measurements.footLength * 0.6),
    measurements.foot * 0.225
  )
  points.frontHeelCp1 = new Point(hyp * 1.2, measurements.footLength * 0.3)
  points.frontHeelCp2 = new Point(hyp * 0.95, height * 0.75)
  points.topFrontCp1 = new Point(points.topFront.x * 1.05, height)

  paths.seam = new Path()
    .move(points.bottomFront)
    .line(points.toeFront)
    .curve(points.toeFrontCp2, points.frontHeelCp1, points.frontHeel)
    .curve(points.frontHeelCp2, points.topFrontCp1, points.topFront)
    .line(points.topBack)
    .line(points.bottomBack)
    .close()
    .attr('class', 'fabric')
  // Complete?
  if (complete) {
    points.logo = points.topBack.shiftFractionTowards(points.frontHeel, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, height / 8)
      .attr('data-text', 'hello')
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

export const side = {
  name: 'side',
  options: {
    length: { pct: 50, min: 30, max: 100, menu: 'style' },
  },
  plugins: [pluginBundle],
  measurements: ['heel', 'ankle', 'footLength', 'foot'],
  draft: draftSide,
}

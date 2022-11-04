svg-flatten <img src="https://app.travis-ci.com/stadline/svg-flatten.svg?branch=master" />
==========================================================================================

Turns SVG shapes (polygon, polyline, rect, g) into SVG paths. It can merge groups and apply transforms.

How to use?
-----------

```js
const svgFlatten = require('svg-flatten')
const fs = require('fs')

let flattendSvgPath = 'tmp-flattened.svg'

// read SVG file into string
let svgString = fs.readFileSync('circle-rect.svg', 'utf8')
// convert all objects to paths 
let modifiedSvgString = svgFlatten(svgString).pathify().value()
// write SVG string to disk
fs.writeFileSync(flattendSvgPath,modifiedSvgString)
```

API
---

### svgFlatten(content: string): SvgFlatten

Reads SVG content and creates a SvgFlatten instance.

### .pathify(): SvgFlatten

Turns SVG shapes (polygon, polyline, rect, g) into SVG paths. It is **needed** before other transformations.

### .flatten(): SvgFlatten

Converts groups of paths to a fat path, combining all child paths into one.

**Be careful: it tries to squash the xml structure, information can be lost.**

Some example of the limitations:
- duplicate attributes cannot be safely squashed, like the id in `<g id="g1"><circle id="c1" r="5"/></g>`
- style rules based on the structure like `#g1 > circle`
- [`use`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use) directive may not apply

### .transform(): SvgFlatten

Apply [SVG transformations](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform) to paths. It doesn't apply clipPath.

### .value(): string

Returns the final result as SVG content.

Need more info?
---------------

Sadly, I wrote this lib for an old project (2016) and didn't need to tweak it since. It is not actively maintened, but I'll try to watch pull-requests.

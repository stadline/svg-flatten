svg-flatten <img src="https://app.travis-ci.com/stadline/svg-flatten.svg?branch=master" />
==========================================================================================

Turns SVG shapes (polygon, polyline, rect, g) into SVG paths. It can merge groups and apply transforms

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

### .transform(): SvgFlatten

Apply SVG transformations to paths.

### .value(): string

Returns the final result as SVG content.

Need more info?
---------------

Sadly, I wrote this lib for an old project (2016) and didn't need to tweak it since. It is not actively maintened, but I'll try to watch pull-requests.

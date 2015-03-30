Klei Dust
=========

> **klei-dust** is a helper (inspired by [Consolidate](https://github.com/visionmedia/consolidate.js)) to use [dustjs-linkedin](https://npmjs.org/package/dustjs-linkedin) templates as views along with [express](https://npmjs.org/package/express) for [node.js](http://nodejs.org/).

Advantages
----------

The main advantage with **klei-dust** is that it supports relative paths for partials and base templates.

**E.g.** you can have a base template `base.dust` at `/views/base.dust` and a child template at `/views/child.dust` with the following contents:

file: /views/base.dust

```html
<!DOCTYPE html>
<html>
    <head>
        <title>A title here</title>
    </head>

    <body>
        {+content/}
    </body>
</html>
```

file: /views/child.dust

```html
{>base/}

{<content}
<p>Child content...</p>
{/content}
```

**And child views in subfolders:**

file: /views/subviews/child2.dust

```html
{>"../base"/}

{<content}
<p>Sub child content...</p>
{/content}
```

See `root` and `relativeToFile` options below for alternatives.

Installation
------------

    $ npm install klei-dust

**N.B.** You must install *dustjs-linkedin* as well.

Setting up Klei Dust with Express
---------------------------------

To use `dust` as your default template file extension use:

```javascript
var express = require('express'),
    kleiDust = require('klei-dust'),
    app = express();

app.configure(function () {
    ...
    app.set('views', __dirname + '/views');
    app.engine('dust', kleiDust.dust);
    app.set('view engine', 'dust');
    app.set('view options', {layout: false});
    ...
});
...
```

If you want another extension, e.g. `html` then use this settings instead:

```javascript
    ...
    kleiDust.setOptions({extension: 'html'}); // Add the extension option
    app.set('views', __dirname + '/views');
    app.engine('html', kleiDust.dust); // change engine to the same filetype
    app.set('view engine', 'html');    // ditto
    app.set('view options', {layout: false});
    ...
```

**N.B.** In the examples above klei-dust uses the express `views` setting to locate views, see options below.

Using klei-dust without express
-------------------------------

How to use klei-dust to compile templates whithout express:

```javascript
var kleiDust = require('klei-dust');

kleiDust.dust('<your-template-folder>/<your-template-name>', <template-data>, function (err, out) {
    if (err) return console.log(err);

    // Do something with `out`...
});
```

Available options
-----------------

* `relativeToFile` - specifies if paths to partials, base templates, etc. should be specified relative to the current view or to the views root folder, defaults to `true`
* `root` - sets the root directory for all the views/templates, if not set the express `views` setting is used (only applies if `relativeToFile` is set to `false`)
* `extension` - sets the default extension for views if omitted in includes/partials, defaults to `.dust`
* `cache` - specifies if the template cache should be enabled or not, defaults to `false`
* `keepWhiteSpace` - if `true` whitespace in templates won't be compressed, defaults to `false`
* `useHelpers` - if `true` klei-dust will try and load dustjs-helpers, defaults to `false`

The options is set with the `setOptions()` method.

Convenience methods
-------------------

* `getDust` - returns the dustjs-linkedin instance to be able to use the streaming api and such.
* `setHelpers` - sets the dust.helpers property to the given value.
* `getHelpers` - gets the current dust.helpers.
* `setFilters` - sets the dust.filters property to the given value.
* `getFilters` - gets the current dust.filters.
* `create` - create a new instance

License
---------

MIT

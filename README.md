Klei Dust
=========

**klei-dust** is a helper (inspired by [Consolidate](https://github.com/visionmedia/consolidate.js)) to use [dustjs-linkedin](https://npmjs.org/package/dustjs-linkedin) templates as views along with [express](https://npmjs.org/package/express) 3.* for [node.js](http://nodejs.org/).

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
    var viewsDir = __dirname + '/views';
    kleiDust.setOptions({root: viewsDir});
    app.set('views', viewsDir);
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
    var viewsDir = __dirname + '/views';
    kleiDust.setOptions({root: viewsDir, extension: 'html'}); // Add the extension option
    app.set('views', viewsDir);
    app.engine('html', kleiDust.dust); // change engine to the same filetype
    app.set('view engine', 'html');    // ditto
    app.set('view options', {layout: false});
    ...
```

Available options
-----------------

* `root` - sets the root directory for all the views/templates
* `extension` - sets the default extension for views if omitted in includes/partials, defaults to `.dust`
* `cache` - specifies if the template cache should be enabled or not, defaults to `false`

The options is set with the `setOptions()` method.

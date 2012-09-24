var dust = require('dustjs-linkedin'),
    fs = require('fs');

var cache = {};

var isInitialized = false;

var settings = {
    extension: '.dust'
};

exports.setOptions = function (options) {
    if (options.root)
        settings.root = options.root;

    if (options.extension)
        settings.extension = options.extension;

    if (options.cache)
        settings.cache = options.cache;
};

exports.getOptions = function () {
    return settings;
};

var fileExists = function (path) {
    try {
        stat = fs.lstatSync(path);
    } catch (e) {
        return false;
    }
    return true;
};

var pathIncludesExtension = function (path) {
    if (!settings.extension)
        return true;

    if (path.slice(-settings.extension.length) == settings.extension)
        return true;

    return false;
};

var getFullPath = function (path) {
    if (settings.root)
        path = settings.root + '/' + path;

    if (fileExists(path))
        return path;

    if (!pathIncludesExtension(path))
        path += settings.extension;

    return path;
};

var getCachedString = function (path) {
    if (!settings.cache) return;

    var str = cache[path];

    if (str && typeof str === 'string')
        return str;
};

var setCachedString = function (path, str) {
    if (!settings.cache) return;

    cache[path] = str;
};

var getCachedTemplate = function (path) {
    if (!settings.cache) return;

    var template = cache[path];

    if (template && typeof template === 'function')
        return template;
};

var setCachedTemplate = function (path, template) {
    if (!settings.cache) {
        dust.cache = {};
        return;
    }
    cache[path] = template;
};

var loadTemplate = function (path, locals, callback) {
    var str = getCachedString(path);

    if (str) return callback(null, str);

    fs.readFile(path, 'utf8', function(err, str){
        if (err) return callback(err);

        setCachedString(path, str);

        callback(null, str);
    });
};

var initializeDust = function (locals) {
    dust.onLoad = function (path, callback) {
        path = getFullPath(path);

        loadTemplate(path, locals, callback);
    };
    isInitialized = true;
};

exports.dust = function(path, locals, callback){
    if (!isInitialized)
        initializeDust(locals);

    var template = getCachedTemplate(path);

    if (template) return template(locals, callback);

    loadTemplate(path, locals, function(err, str) {
        if (err) return callback(err);

        try {
            locals.filename = path;
            template = dust.compileFn(str);

            setCachedTemplate(path, template);

            template(locals, callback);
        } catch (err) {
            callback(err);
        }
    });
};

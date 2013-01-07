var kleiDust = new require('../lib/klei/dust'),
    should = require('should');
    path = require('path');

describe("Path helpers.", function () {
    beforeEach(function (done) {
        kleiDust.resetOptions();
        done();
    });

    describe("pathIncludesExtension", function() {
        describe("when the `extension` setting is not set", function () {
            it("is always true", function (done) {
                kleiDust.setOptions({extension: null});
                kleiDust.pathIncludesExtension("whatever").should.be.true;
                kleiDust.pathIncludesExtension("whatever.dust").should.be.true;
                kleiDust.pathIncludesExtension("folder/whatever.dust").should.be.true;
                done();
            });
        });

        describe("when the `extension` setting is set", function () {
            it("is false when path doesn't end with extension", function (done) {
                kleiDust.setOptions({extension: "dust"});
                kleiDust.pathIncludesExtension("whatever").should.be.false;
                kleiDust.pathIncludesExtension("folder/whatever").should.be.false;
                done();
            });

            it("is true when path does end with extension (even the wrong one)", function (done) {
                kleiDust.setOptions({extension: "dust"});
                kleiDust.pathIncludesExtension("whatever.dust").should.be.true;
                kleiDust.pathIncludesExtension("whatever.dast").should.be.true;
                kleiDust.pathIncludesExtension("folder/whatever.dast").should.be.true;
                done();
            });
        });
    });

    describe("getFullPath", function() {
        describe("when locals is not set", function() {
            describe("with no root setting", function () {
                it("returns the path unchanged for a non-existing file with correct extension", function (done) {
                    kleiDust.getFullPath('non-existing.dust').should.equal('non-existing.dust');
                    done();
                });
                it("returns the path with extension appended if it's missing", function (done) {
                    kleiDust.getFullPath('non-existing').should.equal('non-existing.dust');
                    done();
                });
                it("returns the path unchanged for an existing file with wrong extension", function (done) {
                    kleiDust.getFullPath(__filename).should.equal(__filename);
                    done();
                });
            });

            describe("with root setting", function () {
                it("returns the path with root prepended for a non-existing file with correct extension", function (done) {
                    kleiDust.setOptions({root: "root"});
                    kleiDust.getFullPath('non-existing.dust').should.equal(path.resolve('root', 'non-existing.dust'));
                    done();
                });
                it("returns the path with root prepended and extension appended if it's missing", function (done) {
                    kleiDust.setOptions({root: "root"});
                    kleiDust.getFullPath('non-existing').should.equal(path.resolve('root', 'non-existing.dust'));
                    done();
                });
                it("returns the path with root prepended for an existing file with wrong extension", function (done) {
                    kleiDust.setOptions({root: __dirname});
                    kleiDust.getFullPath(path.basename(__filename)).should.equal(__filename);
                    kleiDust.setOptions({root: path.resolve(__dirname, '..')});
                    kleiDust.getFullPath('package.json').should.equal(path.resolve(__dirname, '..', 'package.json'));
                    kleiDust.getFullPath('test/path_helpers.js').should.equal(path.resolve(__dirname, 'path_helpers.js'));
                    done();
                });
            });
        });

        describe("when locals is set", function() {
            describe("when path relative to file should be resolved", function () {
                it("returns a path resolved relative to the locals.filename", function (done) {
                    var locals = {filename: __filename};
                    var rootlocals = {filename: path.resolve(__dirname, '..', 'package.json')};
                    kleiDust.getFullPath('path_helpers.js', locals).should.equal(__filename);
                    kleiDust.getFullPath('../package.json', locals).should.equal(path.resolve(__dirname, '..', 'package.json'));
                    kleiDust.getFullPath('../test/path_helpers.js', locals).should.equal(__filename);
                    kleiDust.getFullPath('test/path_helpers.js', rootlocals).should.equal(__filename);
                    done();
                });
            });
            describe("when path relative to express views folder should be resolved", function() {
                it("returns a path resolved relative to the locals.settings.views", function(done) {
                    var locals = {settings: {views: __dirname}};
                    var rootlocals = {settings: {views: path.resolve(__dirname, '..')}};
                    kleiDust.getFullPath('path_helpers.js', locals).should.equal(__filename);
                    kleiDust.getFullPath('../package.json', locals).should.equal(path.resolve(__dirname, '..', 'package.json'));
                    kleiDust.getFullPath('../test/path_helpers.js', locals).should.equal(__filename);
                    kleiDust.getFullPath('test/path_helpers.js', rootlocals).should.equal(__filename);
                    done();
                });
            });
        });
    });


    describe("Private path helpers", function() {
        describe("doResolveRelativePath", function() {
            it("is true when relativeToFile setting is true and locals.filename is set", function(done) {
                var locals = {filename: __filename};
                kleiDust.setOptions({relativeToFile: true});
                kleiDust._doResolveRelativePath(locals).should.be.true;
                done();
            });
        });

        describe("doResolveExpressViewsPath", function() {
            it("is true when locals.settings.views is set", function(done) {
                var locals = {settings: {views: __dirname}};
                kleiDust._doResolveExpressViewsPath(locals).should.be.true;
                done();
            });
        });

        describe("doResolveRootSettingPath", function() {
            it("is true when root setting is set", function(done) {
                kleiDust.setOptions({root: __dirname});
                kleiDust._doResolveRootSettingPath().should.be.true;
                done();
            });
        });
    });
});

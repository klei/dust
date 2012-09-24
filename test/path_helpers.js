var kleiDust = require('../lib/klei/dust'),
    should = require('should');
    path = require('path');

describe("Path helpers", function () {
    describe("pathIncludesExtension with no extension setting", function () {
        it("returns true", function (done) {
            kleiDust.setOptions({extension: null});
            kleiDust.pathIncludesExtension("whatever").should.be.true;
            done();
        });
    });

    describe("pathIncludesExtension with extension setting", function () {
        it("returns false when path doesn't end with extension", function (done) {
            kleiDust.setOptions({extension: "dust"});
            kleiDust.pathIncludesExtension("whatever.dast").should.be.false;
            done();
        });

        it("returns true when path does end with extension preceeded with a dot", function (done) {
            kleiDust.setOptions({extension: "dust"});
            kleiDust.pathIncludesExtension("whatever.dust").should.be.true;
            done();
        });

        it("returns false when path does end with extension but is not preceeded with a dot", function (done) {
            kleiDust.setOptions({extension: "dust"});
            kleiDust.pathIncludesExtension("whateverdust").should.be.false;
            done();
        });
    });

    describe("getFullPath with no root setting", function () {
        it("returns the path unchanged for a non-existing file with correct extension", function (done) {
            kleiDust.setOptions({root: null, extension: "dust"});
            kleiDust.getFullPath('non-existing.dust').should.equal('non-existing.dust');
            done();
        });
        it("returns the path with extension appended if it's missing", function (done) {
            kleiDust.setOptions({root: null, extension: "dust"});
            kleiDust.getFullPath('non-existing').should.equal('non-existing.dust');
            done();
        });
        it("returns the path unchanged for an existing file with wrong extension", function (done) {
            kleiDust.setOptions({root: null, extension: "dust"});
            kleiDust.getFullPath(__filename).should.equal(__filename);
            done();
        });
    });

    describe("getFullPath with root setting", function () {
        it("returns the path with root prepended for a non-existing file with correct extension", function (done) {
            kleiDust.setOptions({root: "root", extension: "dust"});
            kleiDust.getFullPath('non-existing.dust').should.equal('root' + path.sep + 'non-existing.dust');
            done();
        });
        it("returns the path with root prepended and extension appended if it's missing", function (done) {
            kleiDust.setOptions({root: "root", extension: "dust"});
            kleiDust.getFullPath('non-existing').should.equal('root' + path.sep + 'non-existing.dust');
            done();
        });
        it("returns the path with root prepended for an existing file with wrong extension", function (done) {
            kleiDust.setOptions({root: __dirname, extension: "dust"});
            // remove folder from file path
            var filename = __filename.slice(__dirname.length + 1);
            kleiDust.getFullPath(filename).should.equal(__filename);
            done();
        });
    });
});

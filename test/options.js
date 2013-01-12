var kleiDust = require('../lib/klei/dust'),
    should = require('should');

describe("Options", function () {
    beforeEach(function (done) {
        kleiDust.resetOptions();
        done();
    });

    describe("getOptions", function () {
        it("should have no root set by default", function (done) {
            should.not.exist(kleiDust.getOptions().root);
            done();
        });
        it("should have dust as default extension", function (done) {
            kleiDust.getOptions().extension.should.equal("dust");
            done();
        });
        it("cache should be false by default", function (done) {
            kleiDust.getOptions().cache.should.be.false;
            done();
        });
        it("relativeToFile should be true by default", function (done) {
            kleiDust.getOptions().relativeToFile.should.be.true;
            done();
        });
        it("useHelpers should be false by default", function (done) {
            kleiDust.getOptions().useHelpers.should.be.false;
            done();
        });
        it("keepWhiteSpace should be false by default", function (done) {
            kleiDust.getOptions().keepWhiteSpace.should.be.false;
            done();
        });
    });

    describe("setOptions", function () {
        it("should set root setting if specified", function (done) {
            var root = "THA ROOT";
            kleiDust.setOptions({root: root});
            kleiDust.getOptions().root.should.equal(root);
            done();
        });

        it("should set cache setting if specified", function (done) {
            var cache = true;
            kleiDust.setOptions({cache: true});
            kleiDust.getOptions().cache.should.equal(cache);
            done();
        });

        it("should set extension setting if specified", function (done) {
            var extension = ".jst";
            kleiDust.setOptions({extension: extension});
            kleiDust.getOptions().extension.should.equal(extension);
            done();
        });

        it("should set relativeToFile setting if specified", function (done) {
            var relativeToFile = false;
            kleiDust.setOptions({relativeToFile: relativeToFile});
            kleiDust.getOptions().relativeToFile.should.equal(relativeToFile);
            done();
        });

        it("should set useHelpers setting if specified", function (done) {
            var useHelpers = true;
            kleiDust.setOptions({useHelpers: useHelpers});
            kleiDust.getOptions().useHelpers.should.equal(useHelpers);
            done();
        });

        it("should set keepWhiteSpace setting if specified", function (done) {
            var keepWhiteSpace = true;
            kleiDust.setOptions({keepWhiteSpace: keepWhiteSpace});
            kleiDust.getOptions().keepWhiteSpace.should.equal(keepWhiteSpace);
            done();
        });

        it("should not set setting that does not exist", function (done) {
            var unknown = "value";
            kleiDust.setOptions({unknown: unknown});
            should.not.exist(kleiDust.getOptions().unknown);
            done();
        });
    });
    describe("resetOptions", function () {
        it("should reset all settings", function (done) {
            var root = "THA ROOT";
            kleiDust.setOptions({
                root: "THA ROOT",
                cache: true,
                extension: "jst",
                relativeToFile: false,
                keepWhiteSpace: true,
                useHelpers: true
            });
            kleiDust.resetOptions();
            should.not.exist(kleiDust.getOptions().root);
            kleiDust.getOptions().cache.should.be.false;
            kleiDust.getOptions().extension.should.equal('dust');
            kleiDust.getOptions().relativeToFile.should.be.true;
            kleiDust.getOptions().keepWhiteSpace.should.be.false;
            kleiDust.getOptions().useHelpers.should.be.false;
            done();
        });
    });
});

var kleiDust = require('../lib/klei/dust'),
    should = require('should');

describe("dust", function () {

    beforeEach(function (done) {
        kleiDust.setOptions({}); // reset options
        done();
    });

    it("should render templates", function (done) {
        var items = {
            items: [
                {item: "Item 1"},
                {item: "Item 2"}
            ]
        };
        kleiDust.setOptions({root: __dirname});
        kleiDust.dust('templates/test', items, function (err, out) {
            should.not.exist(err);
            out.should.equal("<ul><li>Item 1</li><li>Item 2</li></ul>");
            done();
        });
    });

    // Confirm that we don't encounter an EMFILE error when loading the same template many times.
    // See <https://github.com/klei-dev/dust/issues/7> for more detail.
    it("[issue 7] should render templates that includes a partial many times", function (done) {
        var count = 1000; // number of times to include the partial
        var context = { items: [] };
        for(var i=0; i < count; i++) {
            var value = 'Item #'+i
            context.items.push({item:value});
        }
        kleiDust.setOptions({root:__dirname,relativeToFile:false});
        kleiDust.dust('templates/partial-parent', context, function (err, out) {
            should.not.exist(err);
            out.indexOf(context.items[0].item).should.be.above(-1);
            out.indexOf(context.items[count-1].item).should.be.above(-1);
            done();
        });
    });
});

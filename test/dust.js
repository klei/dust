var kleiDust = require('../lib/klei/dust'),
    should = require('should');

describe("dust", function () {
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
});

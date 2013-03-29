var assert = require("assert");
var styles = require("../lib/styles");
var styleReader = require("../lib/style-reader");
var test = require("./testing").test;


describe('styleReader.read', function() {
    test('reads single element', function() {
        assert.deepEqual(styleReader.read("p"), styles.elements(["p"]));
    });
    
    test('reads nested elements', function() {
        assert.deepEqual(styleReader.read("ul li"), styles.elements(["ul", "li"]));
    });
})
"use strict";
var should = require("chai").should();
var disemvowel = require("../disemvowel");
describe("Disemvowel", function() {
  it("display the current date", function() {
    disemvowel("this is lowcase").should.equal("ths s lwcs");
  });
  
});
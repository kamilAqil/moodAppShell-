"use strict";
var expect = require("chai").expect;
// var disemvowel = require("../disemvowel");
// describe("Disemvowel", function() {
//   it("display the current date", function() {
//     disemvowel("this is lowcase").should.equal("ths s lwcs");
//   });
  
// });

var date = require("../public/js/date.js");

describe("Date", function() {
  it("Date displayed is a string", function() {
    expect(date()).to.be.a('string');
  });
  
});
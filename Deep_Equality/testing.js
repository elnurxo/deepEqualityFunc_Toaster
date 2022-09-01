const chai = require("chai");
const { expect } = chai;

const { deepEquals } = require("./app");

describe("deep equals", () => {
  describe("values of the same primitive type", () => {
    it("numbers", () => {
      expect(deepEquals(1, 1)).to.be.true;
      expect(deepEquals(15, 15)).to.be.true;
      expect(deepEquals(0, 1)).to.be.false;
      expect(deepEquals(1, 0)).to.be.false;
      expect(deepEquals(1, 10)).to.be.false;
      expect(deepEquals(10, 1)).to.be.false;
    });

    it("strings", () => {
      expect(deepEquals("", "")).to.be.true;
      expect(deepEquals("a", "a")).to.be.true;
      expect(deepEquals("abc", "abc")).to.be.true;
      expect(deepEquals("", "a")).to.be.false;
      expect(deepEquals("a", "")).to.be.false;
      expect(deepEquals("a", "b")).to.be.false;
      expect(deepEquals("hello", "world")).to.be.false;
      expect(deepEquals("ab", "abc")).to.be.false;
      expect(deepEquals("abc", "ab")).to.be.false;
    });
  });

  describe("arrays", () => {
    it("with no values are equal", () => {
      expect(deepEquals([], [])).to.be.true;
    });

    it("with the same primitive values are equal", () => {
      expect(deepEquals([1], [1])).to.be.true;
      expect(deepEquals([0, 1, 2], [0, 1, 2])).to.be.true;
      expect(deepEquals([0, "abc", 2], [0, "abc", 2])).to.be.true;
      expect(deepEquals([null, undefined, true], [null, undefined, true])).to.be
        .true;
    });
  });

  describe("objects", () => {
    it("with no values are equal", () => {
      expect(deepEquals({}, {})).to.be.true;
    });
    it("with no value but array and object", () => {
        expect(deepEquals({}, [])).to.be.false;
      });
  
    it("with the same primitive values are equal", () => {
      expect(deepEquals({ a: 123 }, { a: 123 })).to.be.true;
      expect(deepEquals({ a: "123" }, { a: "123" })).to.be.true;
      expect(deepEquals({ a: 123, b: "abc" }, { a: 123, b: "abc" })).to.be.true;
      expect(
        deepEquals({ a: 123, c: true, b: "abc" }, { a: 123, b: "abc", c: true })
      ).to.be.true;
    });
  });

  describe("nested objects and arrays", () => {
    it("multi-dimensional arrays", () => {
      expect(deepEquals([[1]], [[1]])).to.be.true;
      expect(deepEquals([[1], [2]], [[1], [2]])).to.be.true;
      expect(deepEquals([[1, true, "abc"], [2]], [[1, true, "abc"], [2]])).to.be
        .true;
      expect(deepEquals([[1, [2, 3, [4, 5]]], [2]], [[1, [2, 3, [4, 5]]], [2]]))
        .to.be.true;
      expect(deepEquals([], [[]])).to.be.false;
      expect(deepEquals([[]], [])).to.be.false;
      expect(deepEquals([[1]], [[]])).to.be.false;
      expect(deepEquals([[]], [[1]])).to.be.false;
      expect(deepEquals([[1]], [[0]])).to.be.false;
      expect(deepEquals([[0, []]], [[0]])).to.be.false;
      expect(deepEquals([[0]], [[0, []]])).to.be.false;
      expect(deepEquals([[0, [1, 2]]], [[0, [1]]])).to.be.false;
      expect(deepEquals([[0, [1]]], [[0, [1, 2]]])).to.be.false;
      expect(deepEquals([[1, true, "abc"], [2]], [[1, true, "abc"]])).to.be
        .false;
      expect(deepEquals([[1, [2, [4, 5]]], [2]], [[1, [2, 3, [4, 5]]], [2]])).to
        .be.false;
      expect(
        deepEquals([[1, [2, "3", [4, 5]]], [2]], [[1, [2, 3, [4, 5]]], [2]])
      ).to.be.false;
    });
  });
});
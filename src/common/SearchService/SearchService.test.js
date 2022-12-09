/* eslint-disable no-undef */
import SearchService from "./SearchService";

const dataArr = [
  { name: "andrew", age: 21, zip: 60600 },
  { name: "andy", age: 37, zip: 60601 },
  { name: "andrea", age: 25, zip: 60602 },
  { name: "joseph", age: 67, zip: 60603 }
];

const service = new SearchService(dataArr);

test("two numeric values", () => {
  expect(service.search("60 and 37")).toMatchObject([{"dataRow": {"age": 37, "name": "andy", "zip": 60601}, "keywords": "andy 37 60601"}]);
});

test("single numeric value", () => {
  expect(service.search("37")).toMatchObject([{"dataRow": {"age": 37, "name": "andy", "zip": 60601}, "keywords": "andy 37 60601"}]);
});

test("single string value", () => {
  expect(service.search("andr")).toMatchObject([{"dataRow": {"age": 21, "name": "andrew", "zip": 60600}, "keywords": "andrew 21 60600"}, {"dataRow": {"age": 25, "name": "andrea", "zip": 60602}, "keywords": "andrea 25 60602"}]);
});

test("string and numeric value", () => {
  expect(service.search("andr 21")).toMatchObject([{"dataRow": {"age": 21, "name": "andrew", "zip": 60600}, "keywords": "andrew 21 60600"}])
});

test("invalid value", () => {
  expect(service.search("steve")).toMatchObject([])
});

test("empty value", () => {
  expect(service.search(" ")).toMatchObject([])
});
import { test,expect } from "jest";

const SearchService = import("./SearchService");

const dataArr = [
    { name: 'andrew', age: 21, zip: 60600 },
    { name: 'andy', age: 37, zip: 60601 },
    { name: 'andrea', age: 25, zip: 60602 },
    { name: 'joseph', age: 67, zip: 60603 }
];

const service = new SearchService(dataArr);

test('non empty data', ()=>{
    expect(service.search('60 and 37')).toMatchObject({keywords: "andy 37 60601"})
})
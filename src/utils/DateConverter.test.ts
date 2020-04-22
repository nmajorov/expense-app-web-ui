/**
 * test date converter
 */

import {formatDate,formateDateStr} from './DateConverter'


test("test the date converter", () => {
   let testDate: string = "2020-04-19T22:00:00.000Z";

  
   console.log("test date: " + testDate)
       expect(formatDate(testDate)).toEqual("2020-04-19")
  
})



test("test before 22  time", () => {
   let testDate: string = "2021-10-09T12:00:00.000Z";

  
   console.log("test date: " + testDate)
       expect(formatDate(testDate)).toEqual("2021-10-09")
  
})

test("convert string to iso date",()=>{
    expect(formateDateStr("2020-04-21")).toEqual("Wed, 20 May 2020 22:00:00 GMT")
})
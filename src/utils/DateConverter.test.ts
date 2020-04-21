/**
 * test date converter
 */

import {formatDate} from './DateConverter'


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

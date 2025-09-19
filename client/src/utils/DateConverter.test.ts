/**
 * test date converter
 */

import {formatDateStr, formateStrToDate} from './DateConverter'


test("test the date converter at 22", () => {
   let testDate: string = "2020-04-19T22:00:00.000Z";

  
   console.log(" test the date converter at 22 test date: " + testDate)
       expect(formatDateStr(testDate)).toEqual("2020-04-20")
  
})



test("test before 22  time", () => {
   let testDate: string = "2021-10-09T12:00:00.000Z";

  
   console.log("test date: " + testDate)
       expect(formatDateStr(testDate)).toEqual("2021-10-09")
  
})

test("convert string to iso date",()=>{
    //The getMonth() method returns the month in the specified date according
    // to local time, as a zero-based value
    // (where zero indicates the first month of the year).
    expect(formateStrToDate("2020-05-21").toUTCString()).toEqual(new Date(2020,(5-1),21).toUTCString())
})
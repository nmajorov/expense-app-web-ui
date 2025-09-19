import {calcDuration} from "./index"
test("calculate seconds duration",() =>{
    
    let startDate=  new Date("2019-12-06 09:58:03");
    let endDate = new Date("2019-12-06 09:58:05");
    expect(calcDuration(startDate,endDate)).toBe("2s")

})


test("calculate minutes duration",() =>{
    
    let startDate=  new Date("2019-12-06 09:50:03");
    let endDate = new Date("2019-12-06 09:58:16");
    expect(calcDuration(startDate,endDate)).toBe("8m 13s")

})

test("calculate hours duration",() =>{
    
    let startDate=  new Date("2019-12-06 09:50:03");
    let endDate = new Date("2019-12-06 12:58:16");
    expect(calcDuration(startDate,endDate)).toBe("3h 8m 13s")

})

test("calculate with wrong end minus date",() =>{
    
    let startDate=  new Date("2020-03-24 17:40:01");
    let endDate =new Date("1970-01-01");
    let duration = calcDuration(startDate,endDate);
    console.log("duration: " + duration)
    expect(duration).not.toEqual("")

})
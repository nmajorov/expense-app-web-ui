// TODO look in this library  
//https://github.com/date-fns
//import { formatRFC7231 } from 'date-fns'




/**
 *  convert calender react component selected  date  to string.
 * if user change the date in form it will trigger update of calender component.
 * To avoid wrong date manipulation we have to convert it to proper string.
 * We don't care about hours only current date is important  for application.
 * 
 * @param input current in calender element in  browser selected date
 */
export const formatDateStr = (input: any):string => {

  if (input.toString().indexOf('-') >=0) {
   return  formatDateISOStr(input.toString())
  }
  let nd = new Date(input);

  var mm = nd.getMonth() + 1; // getMonth() is zero-based
  var dd = nd.getDate();

 return [nd.getFullYear(),
      (mm>9 ? '' : '0') + mm,
      (dd>9 ? '' : '0') + dd
     ].join('-');

}


/**
 * return date in short format like 2020-04-20
 * 
 * @param input date in full format handleSubmit: 2020-04-19T22:00:00.000Z" or
 * 
 */
export const formatDateISOStr = (input: string):string => {
  console.log("formatDateISOStr: " + input)
 

 

   let tmpArrayDate =  input.split('-');
   console.log("tmpArrayDate: " + tmpArrayDate)
   //let nd = new Date(input);

    let year = tmpArrayDate[0] 
    let mm = tmpArrayDate[1]
    let dd = tmpArrayDate[2]
    let hours = ''
    
    console.log("dd: " + dd)
    //if found Time as hours split it again
    // 19T22:00:00.000Z split to 19 22:00:0000Z
    if (dd.indexOf('T') > 0 ) {
      let tmpArrayDayHours = dd.split('T');
      console.log("tmpArrayDayHours: " + tmpArrayDayHours)
      //set day 
      dd = tmpArrayDayHours[0]
      hours = tmpArrayDayHours[1]
      console.log("hours: " + hours)

      let tmpArrayHours = hours.split(':');
      console.log("tmpArrayHours: " + tmpArrayHours)
       
      //now check if  hours has this format 22:00:0000Z
      if (tmpArrayHours.length > 1){
        //split  again 
        
        let hours = Number(tmpArrayHours[0]);
        if (hours >= 22) {
          //increase date by 1
          dd = (Number(dd) + 1).toString()
        }

      }  

    } else{
      dd = tmpArrayDate[2]
    }

  
    console.log("mm: " + mm + " dd: " + dd + " hours: " + hours)
   
   return [year,
        mm,
        dd
       ].join('-');

}

/**
 * Format string to date object
 * @param input string
 * @returns Date object
 */
export const formateStrToDate = (input:string) : Date  =>{
    if (!input){
        return new Date()
    }
    let sd = input.split("-");
    let result= new Date(Number(sd[0]),Number(sd[1]) - 1 , Number(sd[2]))

    return result;
}

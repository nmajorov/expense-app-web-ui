// TODO look in this library  
//https://github.com/date-fns

/**
 * return date in short format like 2020-04-20
 * 
 * @param input date in full format handleSubmit: 2020-04-19T22:00:00.000Z"
 */
export const formatDate = (input: string):string => {
   let nd = new Date(input);

    var mm = nd.getMonth() + 1; // getMonth() is zero-based
    var dd = nd.getDate();
    let hours = nd.getUTCHours()
    //fix day if hours going over 22 
    if (hours >= 22){
        dd -= 1
    }
   return [nd.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
       ].join('-');

}


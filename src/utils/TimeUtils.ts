

/**
 * Calculate duration of some process 
 * and return it string presentation
 *  
 * @param start start time of process 
 * @param end end time of process
 * @return the string representation of duration as h m s
 */
export const calcDuration = (start: Date, end: Date) => {
       let result = '';
    

    const duration = (end.getTime() - start.getTime()) / 1000;

    if (duration <= 60) {
        // just calculate seconds 
        result = duration + "s"
    } else if (duration > 60 && duration < 3600) {
        // define minutes
        return calculateMinSec(duration);


    } else if (duration > 3600) {
        // define hours
        const hours = Math.floor(duration / 3600)
        result += hours + "h"
        // calculate min and seconds without hours
        result += " " + calculateMinSec((duration - (hours * 3600)))
    }

    if (result.startsWith("-")) {
        return calcDuration(start,new Date());
    }

    return result


    /**
     * calculate min and seconds from duration time and 
     * return it sting representation in  m s
     * @param dr total duration time in seconds
     */
    function calculateMinSec(dr: number) {
        // console.log("dr: "+ dr)
        let result = "";
        const minuteDuration = Math.round(dr / 60) + "m";
        result += minuteDuration;
        if ((dr / 60).toString().indexOf('.') !== -1) {
            const sec = (dr - Math.floor(dr / 60) * 60);
            let extraSecond = (sec).toString();
            // round for nice view in table
            if (extraSecond.length > 2){
                extraSecond = Math.round(sec).toString();
            }
            result += " " + extraSecond + "s";
        }
        return result
    }


}


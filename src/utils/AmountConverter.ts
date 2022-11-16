import { ExchangeQuote } from "../types/ExchangeQuote"

/**
 * convert strings to money amount in Number
 * 
 */
export const convertStrToAmount = (input: string): Number => {


    if (input.includes(".")) {

        if ((input.split(".")[1]) === "") {
            throw new Error("NaN")

        }

        if ((input.split(".")[1]) === "0") {
            throw new Error("Not complete")
        }

    }


    const amount = Number(input)
    if (isNaN(amount)) {
        throw new Error("NaN")
    }

    if (amount <= 0) {
        throw new Error("Negative")
    }

    // const stringy = amount.toString().split(".")[1]
    // if (stringy !== undefined && stringy.length > 2) {
   //     console.log("")
   //     return Number(amount.toFixed(2))
        
        // throw new Error("ToLong")

   // }

   console.debug(`convert string ${input}  to amount ${amount}`)
   

    return  Number(amount.toFixed(2))
}

export const convertAmountToStr = (input: Number): string => {
    
    const result = input.toFixed(2);
    console.debug("convertAmountToStr " + result)
    return result.valueOf();
}



/**
 * convert amount with a given exchange rate
 * @param quote  exchange quote given
 * @param amount amount to convert
 */
export const exchange = ( quote: Number, amount: Number ): Number =>{
    return (amount.valueOf() * quote.valueOf())
}



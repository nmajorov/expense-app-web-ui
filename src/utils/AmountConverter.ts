/*eslint no-throw-literal: "error"*/

/**
 * convert strings to money amount in Number
 * 
 */
export const convertStrToAmount = (input: string):Number => {




    let amount = Number(input)
    if (isNaN(amount)) {
        throw new Error("NaN")
    }

    if (amount <=0) {
        throw new Error("Negative")
    }

    let stringy = amount.toString().split(".")[1]
    if (stringy !== undefined && stringy.length > 2) {
        throw new Error("ToLong")
    }

    return amount
}


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

    const stringy = amount.toString().split(".")[1]
    if (stringy !== undefined && stringy.length > 2) {
        throw new Error("ToLong")
    }

    return amount
}

export const convertAmountToStr = (input: Number): string => {
    const result = String(input);
    console.debug("convertAmountToStr " + result)
    return result.valueOf();
}
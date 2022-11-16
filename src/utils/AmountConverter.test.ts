import { exchange } from "./AmountConverter";
import { convertStrToAmount , convertAmountToStr} from "./index";


test("convert valid amount", () => {
    let amounts: Array<string> = ["10.12", "103", "1.01"];

    amounts.forEach(element => {
        console.log("test amount: " + element)
        expect(convertStrToAmount(element)).not.toBeNaN()
    });
})


test("test negative amount", () => {
    let amount = "-10.12"
    
    expect(() => {
        convertStrToAmount(amount);
      }).toThrow(new Error("Negative"))
    
})

test("test NaN amount", () => {
    let amount = "blablabala"
    
    expect(() => {
        convertStrToAmount(amount);
      }).toThrow(new Error("NaN"))
    
})


test("convert too long precision amount as string to number ", () => {
    let amount = "18.2345"
    
    console.log(`string amount ${amount} need to convert to Number`)
    let result =  convertStrToAmount(amount);
    // console.log(`converted result: ${result}`)

    expect(result).toBe(18.23)
    
})

test("test one zero  after point amount", () => {
    let amount = "18.0"
    
    expect(() => {
        convertStrToAmount(amount);
      }).toThrow(new Error("Not complete"))
    
})

test("test string to amount", () => {
    let amount = Number(18.23);
    console.log("amount: " + amount.toString())
    
    expect(convertAmountToStr(amount)
            ).toEqual("18.23")
    
})
test("test wrong point string to amount", () => {
    let amount = "18."
    
    expect(() => {
        convertStrToAmount(amount);
      }).toThrow(new Error("NaN"))
    
})


test('exchange conversion test EUR_CHF', () => {
    let quote: Number = 0.9758;
    let amount: Number = 100;
    let expectResult = 97.58;
    console.log(`test exchange EUR_CHF  amount ${amount} with quote: ${quote}`);
    expect(exchange(quote, 100)).toEqual(expectResult);
});

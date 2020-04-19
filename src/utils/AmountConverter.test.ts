import { convertStrToAmount } from "./index";


test("convert valid amount", () => {
    let amounts: Array<string> = ["10.12", "103", "1.0"];

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


test("test too long amount", () => {
    let amount = "18.2345"
    
    expect(() => {
        convertStrToAmount(amount);
      }).toThrow(new Error("ToLong"))
    
})

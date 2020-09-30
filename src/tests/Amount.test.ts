import { AmountBusiness } from "../business/AmountBusiness"

describe("Errors - Amount Tests", () => {

    let amountDatabase = {}
    let idGenerate = {}
    let authenticator = {}

    test("Error - Insert Amount", async() => {
        expect.assertions(1);
        try{
            const amount = new AmountBusiness(
                amountDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await amount.insertAmount({});
        } catch(error){
            expect(error.message).toBe('Invalid Entry')
        }
    });

    test("Error - Path", async() => {
        expect.assertions(1);
        
        try{
            const amount = new AmountBusiness(
                amountDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await amount.insertAmount({
                token: 'token',
                value: 30000,
                nextendpoint: ''
            });
        } catch(error){
            expect(error.message).toBe('Invalid Path');
        }
    });
})

describe("Amount tests", () => {

    let amountDatabase = {
        insertAmount: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let authenticator = {
        getData: jest.fn(() => "idData")
    }

    test("Insert Amount", async() => {
        expect.assertions(3)
        try {
            const amount = new AmountBusiness(
                amountDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await amount.insertAmount({
                token: 'token',
                value: 300000,
                nextendpoint: "AMOUNT"
            });

            expect(amountDatabase.insertAmount).toBeCalled();
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        } catch (error) {}
    })
})
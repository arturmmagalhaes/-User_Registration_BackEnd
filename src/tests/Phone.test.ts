import { PhoneBusiness } from '../business/PhoneBusiness';

describe("Errors - Phone Tests", () => {

    let phoneDatabase = {}
    let idGenerate = {}
    let authenticator = {}

    test("Error - Insert Phone", async() => {
        expect.assertions(1);

        const phone = new PhoneBusiness(
            phoneDatabase as any,
            idGenerate as any,
            authenticator as any
            );

        try { 
            await phone.insertPhone({})
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Update Phone", async() => {
        expect.assertions(1);

        const phone = new PhoneBusiness(
            phoneDatabase as any, 
            idGenerate as any,
            authenticator as any
        );

        try { 
            await phone.updatePhone({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Path Phone", async() => {
        expect.assertions(1);

        try {
        const phone = new PhoneBusiness(
            phoneDatabase as any, 
            idGenerate as any,
            authenticator as any
        );

        await phone.insertPhone({
            number: 30000,
            token: '123456',
            nextendpoint: ''
        });
        
        } catch (error) {
            expect(error.message).toBe('Invalid Path')
        }
    })
});

describe("Phone Tests", () => {
    
    let phoneDatabase = {
        insertPhone: jest.fn(() => {}),
        updatePhone: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let authenticator = {
        generateToken: jest.fn(() => "token"),
        getData: jest.fn(() => "idToken")
    }

    test("Insert Phone", async() => {
        expect.assertions(2);

        const phone = new PhoneBusiness(
            phoneDatabase as any,
            idGenerate as any,
            authenticator as any
        );

        try {
            await phone.insertPhone({
                number: 30000,
                token: '123456',
                nextendpoint: 'Phone'
            });
    
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        } catch (error) {
            
        }
        
    });

    test("Update Phone", async() => {
        expect.assertions(2);

        const phone = new PhoneBusiness(
            phoneDatabase as any,
            idGenerate as any,
            authenticator as any
        );

        try{
            await phone.updatePhone({
                id: '001',
                number: 123456,
                id_user: '001',
                dateNow: '2020-09-29 22:50:00',
                token: 'token'
            });
            
            expect(authenticator.getData).toBeCalled();
            expect(phoneDatabase.updatePhone).toBeCalled();
        } catch(error) {}
    });

});

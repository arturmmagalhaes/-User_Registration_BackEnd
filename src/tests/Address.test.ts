import { AddressBusiness } from "../business/AddressBusiness";
import axios from 'axios';

describe("Errors - Address Tests", () => {

    let addressDatabase = {}
    let idGenerate = {}
    let authenticator = {}

    test("Error - Insert Address", async() => {
        expect.assertions(1);

        const address = new AddressBusiness(
            addressDatabase as any,
            idGenerate as any,
            authenticator as any
            );

        try { 
            await address.insertAddress({})
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Update Address", async() => {
        expect.assertions(1);

        const address = new AddressBusiness(
            addressDatabase as any, 
            idGenerate as any,
            authenticator as any
        );

        try { 
            await address.updateAddress({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Path Address", async() => {
        expect.assertions(1);

        const address = new AddressBusiness(
            addressDatabase as any, 
            idGenerate as any,
            authenticator as any
        );

        try { 
            await address.insertAddress({
                id: "id",
                cep: "60190390",
                street: "alameda das papoulas",
                number: "130",
                complement: "Quadra 16",
                city: "Fortaleza",
                state: "Ceará",
                token: "token",
                nextendpoint: ""
            });
        } catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    });
    
});

describe("Address Tests", () => {
    
    let addressDatabase = {
        insertAddress: jest.fn(() => {}),
        updateAddress: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let authenticator = {
        getData: jest.fn(() => "idToken")
    }

    test("Insert Address", async() => {
        expect.assertions(3);

        try {
            const address = new AddressBusiness(
                addressDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await address.insertAddress({
                id: "id",
                cep: "60190390",
                street: "alameda das papoulas",
                number: "130",
                complement: "Quadra 16",
                city: "Fortaleza",
                state: "Ceará",
                token: "token",
                nextendpoint: "ADDRESS"
            });

            axios.get

            expect(addressDatabase.insertAddress).toBeCalled();
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        } catch (error) {}
    });

    test("Update Address", async() => {
        expect.assertions(2);

        try {
            const address = new AddressBusiness(
                addressDatabase as any,
                idGenerate as any,
                authenticator as any
            );

            await address.updateAddress({
                id: "id",
                cep: "60190390",
                street: "alameda das papoulas",
                number: "130",
                complement: "Quadra 16",
                city: "Fortaleza",
                state: "Ceará",
                token: "token",
                nextendpoint: "Address"
            });

            axios.get

            expect(addressDatabase.updateAddress).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        } catch (error) {}
    });

})

describe("Functions - Address Tests", () => {
    
    let addressDatabase = {}
    let idGenerate = {}
    let authenticator = {}

    test("getAddress", async() => {
        expect.assertions(1);

        const address = new AddressBusiness(
            addressDatabase as any,
            idGenerate as any,
            authenticator as any
        );
        
        const result = await address.getAddress({
            cep: '60190390',
            street: 'alameda das papoulas',
            city: 'Fortaleza'
        });

        axios.get

        expect(result).toEqual(true);
    });

});

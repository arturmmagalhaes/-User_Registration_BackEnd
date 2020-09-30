"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PhoneBusiness_1 = require("../business/PhoneBusiness");
describe("Errors - Phone Tests", () => {
    let phoneDatabase = {};
    let idGenerate = {};
    let authenticator = {};
    test("Error - Insert Phone", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const phone = new PhoneBusiness_1.PhoneBusiness(phoneDatabase, idGenerate, authenticator);
        try {
            yield phone.insertPhone({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Update Phone", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const phone = new PhoneBusiness_1.PhoneBusiness(phoneDatabase, idGenerate, authenticator);
        try {
            yield phone.updatePhone({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Path Phone", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const phone = new PhoneBusiness_1.PhoneBusiness(phoneDatabase, idGenerate, authenticator);
            yield phone.insertPhone({
                number: 30000,
                token: '123456',
                nextendpoint: ''
            });
        }
        catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    }));
});
describe("Phone Tests", () => {
    let phoneDatabase = {
        insertPhone: jest.fn(() => { }),
        updatePhone: jest.fn(() => { })
    };
    let idGenerate = {
        generate: jest.fn(() => "id")
    };
    let authenticator = {
        generateToken: jest.fn(() => "token"),
        getData: jest.fn(() => "idToken")
    };
    test("Insert Phone", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const phone = new PhoneBusiness_1.PhoneBusiness(phoneDatabase, idGenerate, authenticator);
        try {
            yield phone.insertPhone({
                number: 30000,
                token: '123456',
                nextendpoint: 'Phone'
            });
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        }
        catch (error) {
        }
    }));
    test("Update Phone", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const phone = new PhoneBusiness_1.PhoneBusiness(phoneDatabase, idGenerate, authenticator);
        try {
            yield phone.updatePhone({
                id: '001',
                number: 123456,
                id_user: '001',
                dateNow: '2020-09-29 22:50:00',
                token: 'token'
            });
            expect(authenticator.getData).toBeCalled();
            expect(phoneDatabase.updatePhone).toBeCalled();
        }
        catch (error) { }
    }));
});

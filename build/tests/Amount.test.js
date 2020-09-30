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
const AmountBusiness_1 = require("../business/AmountBusiness");
describe("Errors - Amount Tests", () => {
    let amountDatabase = {};
    let idGenerate = {};
    let authenticator = {};
    test("Error - Insert Amount", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const amount = new AmountBusiness_1.AmountBusiness(amountDatabase, idGenerate, authenticator);
            yield amount.insertAmount({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Path", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const amount = new AmountBusiness_1.AmountBusiness(amountDatabase, idGenerate, authenticator);
            yield amount.insertAmount({
                token: 'token',
                value: 30000,
                nextendpoint: ''
            });
        }
        catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    }));
});
describe("Amount tests", () => {
    let amountDatabase = {
        insertAmount: jest.fn(() => { })
    };
    let idGenerate = {
        generate: jest.fn(() => "id")
    };
    let authenticator = {
        getData: jest.fn(() => "idData")
    };
    test("Insert Amount", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(3);
        try {
            const amount = new AmountBusiness_1.AmountBusiness(amountDatabase, idGenerate, authenticator);
            yield amount.insertAmount({
                token: 'token',
                value: 300000,
                nextendpoint: "Amount"
            });
            expect(amountDatabase.insertAmount).toBeCalled();
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        }
        catch (error) { }
    }));
});

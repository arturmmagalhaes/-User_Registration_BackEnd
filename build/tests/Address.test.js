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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressBusiness_1 = require("../business/AddressBusiness");
const axios_1 = __importDefault(require("axios"));
describe("Errors - Address Tests", () => {
    let addressDatabase = {};
    let idGenerate = {};
    let authenticator = {};
    test("Error - Insert Address", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const address = new AddressBusiness_1.AddressBusiness(addressDatabase, idGenerate, authenticator);
        try {
            yield address.insertAddress({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Update Address", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const address = new AddressBusiness_1.AddressBusiness(addressDatabase, idGenerate, authenticator);
        try {
            yield address.updateAddress({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Path Address", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const address = new AddressBusiness_1.AddressBusiness(addressDatabase, idGenerate, authenticator);
        try {
            yield address.insertAddress({
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
        }
        catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    }));
});
describe("Address Tests", () => {
    let addressDatabase = {
        insertAddress: jest.fn(() => { }),
        updateAddress: jest.fn(() => { })
    };
    let idGenerate = {
        generate: jest.fn(() => "id")
    };
    let authenticator = {
        getData: jest.fn(() => "idToken")
    };
    test("Insert Address", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(3);
        try {
            const address = new AddressBusiness_1.AddressBusiness(addressDatabase, idGenerate, authenticator);
            yield address.insertAddress({
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
            axios_1.default.get;
            expect(addressDatabase.insertAddress).toBeCalled();
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        }
        catch (error) { }
    }));
    test("Update Address", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const address = new AddressBusiness_1.AddressBusiness(addressDatabase, idGenerate, authenticator);
            yield address.updateAddress({
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
            axios_1.default.get;
            expect(addressDatabase.updateAddress).toBeCalled();
            expect(authenticator.getData).toBeCalled();
        }
        catch (error) { }
    }));
});
describe("Functions - Address Tests", () => {
    let addressDatabase = {};
    let idGenerate = {};
    let authenticator = {};
    test("getAddress", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const address = new AddressBusiness_1.AddressBusiness(addressDatabase, idGenerate, authenticator);
        const result = yield address.getAddress({
            cep: '60190390',
            street: 'alameda das papoulas',
            city: 'Fortaleza'
        });
        axios_1.default.get;
        expect(result).toEqual(true);
    }));
});

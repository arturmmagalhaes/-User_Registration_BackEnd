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
const UserBusiness_1 = require("../business/UserBusiness");
describe("Errors - User Tests", () => {
    let userDatabase = {};
    let idGenerate = {};
    let hashManager = {};
    let authenticator = {};
    test("Error - Create User", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.createUser({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Login User", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.login({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Insert Cpf", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertCPF({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Insert Name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertName({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - insert Birthday", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertBirthday({});
        }
        catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    }));
    test("Error - Path CPF", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertCPF({
                cpf: '55733243732',
                nextendpoint: '',
                token: 'token'
            });
        }
        catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    }));
    test("Error - Path Name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertName({
                name: 'Artur Magalhães',
                nextendpoint: '',
                token: 'token'
            });
        }
        catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    }));
    test("Error - Path Birthday", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertBirthday({
                birthday: '22-10-1995',
                nextendpoint: '',
                token: 'token'
            });
        }
        catch (error) {
            expect(error.message).toBe('Invalid Path');
        }
    }));
});
describe("User Tests", () => {
    let userDatabase = {
        createUser: jest.fn(() => { }),
        login: jest.fn(() => {
            return {
                id: "id",
                password: "123456"
            };
        }),
        insertCPF: jest.fn(() => { }),
        insertName: jest.fn(() => { }),
        insertBirthday: jest.fn(() => { })
    };
    let idGenerate = {
        generate: jest.fn(() => "id")
    };
    let hashManager = {
        hash: jest.fn(() => "hash"),
        compare: jest.fn(() => true)
    };
    let authenticator = {
        generateToken: jest.fn(() => "token"),
        getData: jest.fn(() => "idToken")
    };
    test("Create User", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.createUser({
                email: 'artur@gmail.com',
                password: '123456'
            });
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.generateToken).toBeCalled();
        }
        catch (error) {
        }
    }));
    test("Login User", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(4);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            const result = yield user.login({
                email: 'artur@gmail.com',
                password: '123456'
            });
            expect(result).toBe('token');
            expect(userDatabase.login).toBeCalled();
            expect(hashManager.compare).toBeCalled();
            expect(authenticator.generateToken).toBeCalled();
        }
        catch (error) { }
    }));
    test("insertCPF User", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertCPF({
                cpf: '55733243732',
                nextendpoint: 'CPF',
                token: 'token'
            });
            expect(authenticator.getData).toBeCalled();
            expect(userDatabase.insertCPF).toBeCalled();
        }
        catch (error) { }
    }));
    test("insertCPF Name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertName({
                name: 'Artur Magalhães',
                nextendpoint: 'Fullname',
                token: 'token'
            });
            expect(authenticator.getData).toBeCalled();
            expect(userDatabase.insertName).toBeCalled();
        }
        catch (error) { }
    }));
    test("insertCPF Birthday", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        try {
            yield user.insertBirthday({
                birthday: '22-10-1995',
                nextendpoint: 'Birthday',
                token: 'token'
            });
            expect(authenticator.getData).toBeCalled();
            expect(userDatabase.insertBirthday).toBeCalled();
        }
        catch (error) { }
    }));
});
describe("Functions - User Tests", () => {
    let userDatabase = {};
    let idGenerate = {};
    let hashManager = {};
    let authenticator = {};
    test("TransformDate", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        const result = yield user.transformDate("22-10-1995");
        expect(result).toEqual('1995-10-22');
    }));
    test("Full Name", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        const result = yield user.fullName('Artur Marques Magalhães');
        expect(result).toEqual({
            name: 'Artur',
            lastName: 'Marques Magalhães'
        });
    }));
    test("Validate CPF - Error", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        const result = yield user.validateCPF('11111111111');
        expect(result).toEqual(false);
    }));
    test("Validate CPF", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const user = new UserBusiness_1.UserBusiness(userDatabase, idGenerate, hashManager, authenticator);
        const result = yield user.validateCPF('55733243732');
        expect(result).toEqual(true);
    }));
});

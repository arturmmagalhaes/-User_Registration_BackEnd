import { UserBusiness } from "../business/UserBusiness";

describe("Errors - User Tests", () => {

    let userDatabase = {}
    let idGenerate = {}
    let hashManager = {}
    let authenticator = {}

    test("Error - Create User", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any, 
            idGenerate as any, 
            hashManager as any, 
            authenticator as any
        );

        try { 
            await user.createUser({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Login User", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any, 
            idGenerate as any, 
            hashManager as any, 
            authenticator as any
        );

        try { 
            await user.login({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Insert Cpf", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any, 
            idGenerate as any, 
            hashManager as any, 
            authenticator as any
        );

        try { 
            await user.insertCPF({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - Insert Name", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any, 
            idGenerate as any, 
            hashManager as any, 
            authenticator as any
        );

        try { 
            await user.insertName({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

    test("Error - insert Birthday", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any, 
            idGenerate as any, 
            hashManager as any, 
            authenticator as any
        );

        try { 
            await user.insertBirthday({});
        } catch (error) {
            expect(error.message).toBe('Invalid Entry');
        }
    });

});

describe("User Tests", () => {
    
    let userDatabase = {
        createUser: jest.fn(() => {}),
        login: jest.fn(() => {
            return {
                id: "id",
                password: "123456"
            }
        }),
        insertCPF: jest.fn(() => {}),
        insertName: jest.fn(() => {}),
        insertBirthday: jest.fn(() => {})
    }
    let idGenerate = {
        generate: jest.fn(() => "id")
    }
    let hashManager = {
        hash: jest.fn(() => "hash"),
        compare: jest.fn(() => true)
    }
    let authenticator = {
        generateToken: jest.fn(() => "token"),
        getData: jest.fn(() => "idToken")
    }

    test("Create User", async() => {
        expect.assertions(2);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        try {
            await user.createUser({
                email: 'artur@gmail.com',
                password: '123456'
            });
    
            expect(idGenerate.generate).toBeCalled();
            expect(authenticator.generateToken).toBeCalled();
        } catch (error) {
            
        }
        
    });

    test("Login User", async() => {
        expect.assertions(4);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        try{
            const result = await user.login({
                email: 'artur@gmail.com',
                password: '123456'
            });
            
            expect(result).toBe('token');
            expect(userDatabase.login).toBeCalled();
            expect(hashManager.compare).toBeCalled();
            expect(authenticator.generateToken).toBeCalled();
        } catch(error) {}
    });

    test("insertCPF User", async() => {
        expect.assertions(2);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        try{
            await user.insertCPF({
                cpf: '55733243732',
                nextendpoint: 'CPF',
                token: 'token'
            });
    
        expect(authenticator.getData).toBeCalled();
        expect(userDatabase.insertCPF).toBeCalled();
        } catch(error) {}
    });

    test("insertCPF Name", async() => {
        expect.assertions(2);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        try{
            await user.insertName({
                name: 'Artur Magalhães',
                nextendpoint: 'Fullname',
                token: 'token'
            });
    
        expect(authenticator.getData).toBeCalled();
        expect(userDatabase.insertName).toBeCalled();
        } catch(error) {}
    });

    test("insertCPF Birthday", async() => {
        expect.assertions(2);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );

        try{
            await user.insertBirthday({
                birthday: '22-10-1995',
                nextendpoint: 'Birthday',
                token: 'token'
            });
    
        expect(authenticator.getData).toBeCalled();
        expect(userDatabase.insertBirthday).toBeCalled();
        } catch(error) {}
    });

});

describe("Functions - User Tests", () => {
    
    let userDatabase = {}
    let idGenerate = {}
    let hashManager = {}
    let authenticator = {}

    test("TransformDate", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );
        
        const result = await user.transformDate("22-10-1995");

        expect(result).toEqual('1995-10-22');
    });

    test("Full Name", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );
        
        const result = await user.fullName('Artur Marques Magalhães');

        expect(result).toEqual({
            name: 'Artur',
            lastName: 'Marques Magalhães'
        });
    });

    test("Validate CPF - Error", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );
        
        const result = await user.validateCPF('11111111111');

        expect(result).toEqual(false);
    });

    test("Validate CPF", async() => {
        expect.assertions(1);

        const user = new UserBusiness(
            userDatabase as any,
            idGenerate as any,
            hashManager as any,
            authenticator as any
        );
        
        const result = await user.validateCPF('55733243732');

        expect(result).toEqual(true);
    });

});



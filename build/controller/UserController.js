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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../database/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerate_1 = require("../services/IdGenerate");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield UserController.USERBUSINESS.createUser({
                    email: req.body.email,
                    password: req.body.password
                });
                res.status(200).send({
                    token,
                    nextendpoint: "CPF"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserController.USERBUSINESS.login({
                    email: req.body.email,
                    password: req.body.password
                });
                res.status(200).send({
                    token: result.token,
                    nextendpoint: result.missingEndpoints
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    insertCPF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserController.USERBUSINESS.insertCPF({
                    token: req.headers.authorization,
                    cpf: req.body.cpf,
                    nextendpoint: req.body.nextendpoint
                });
                res.status(200).send({
                    message: "Insert CPF!",
                    nextendpoint: "FULLNAME"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    insertName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserController.USERBUSINESS.insertName({
                    token: req.headers.authorization,
                    name: req.body.name,
                    nextendpoint: req.body.nextendpoint
                });
                res.status(200).send({
                    message: "Insert Name!",
                    nextendpoint: "BIRTHDAY"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    insertBirthday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserController.USERBUSINESS.insertBirthday({
                    token: req.headers.authorization,
                    birthday: req.body.birthday,
                    nextendpoint: req.body.nextendpoint
                });
                res.status(200).send({
                    message: "Insert Birthday!",
                    nextendpoint: "PHONE"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
}
exports.UserController = UserController;
UserController.USERBUSINESS = new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new IdGenerate_1.IdGenerate(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());

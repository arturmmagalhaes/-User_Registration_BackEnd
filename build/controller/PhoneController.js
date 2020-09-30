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
exports.PhoneController = void 0;
const PhoneBusiness_1 = require("../business/PhoneBusiness");
const PhoneDatabase_1 = require("../database/PhoneDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerate_1 = require("../services/IdGenerate");
class PhoneController {
    insertPhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PhoneController.PHONEBUSINESS.insertPhone({
                    token: req.headers.authorization,
                    number: req.body.number,
                    nextendpoint: req.body.nextendpoint
                });
                res.status(200).send({
                    message: "Insert Phone",
                    nextendpoint: "ADDRESS"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    updatePhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PhoneController.PHONEBUSINESS.updatePhone({
                    id: req.params.id,
                    token: req.headers.authorization,
                    number: req.body.number,
                });
                res.status(200).send({
                    message: "Update Phone"
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
exports.PhoneController = PhoneController;
PhoneController.PHONEBUSINESS = new PhoneBusiness_1.PhoneBusiness(new PhoneDatabase_1.PhoneDatabase(), new IdGenerate_1.IdGenerate(), new Authenticator_1.Authenticator());

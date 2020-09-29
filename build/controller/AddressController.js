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
exports.AddressController = void 0;
const AddressBusiness_1 = require("../business/AddressBusiness");
const AddressDatabase_1 = require("../database/AddressDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerate_1 = require("../services/IdGenerate");
class AddressController {
    insertAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AddressController.ADDRESSBUSINESS.insertAddress({
                    token: req.headers.authorization,
                    cep: req.body.cep,
                    street: req.body.street,
                    number: req.body.number,
                    complement: req.body.complement,
                    city: req.body.city,
                    state: req.body.state,
                    nextendpoint: req.body.nextendpoint
                });
                res.status(200).send({
                    message: "Insert Address",
                    nextendpoint: "Amount"
                });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message
                });
            }
        });
    }
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AddressController.ADDRESSBUSINESS.updateAddress({
                    id: req.params.id,
                    token: req.headers.authorization,
                    cep: req.body.cep,
                    street: req.body.street,
                    number: req.body.number,
                    complement: req.body.complement,
                    city: req.body.city,
                    state: req.body.state
                });
                res.status(200).send({
                    message: "Update Address"
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
exports.AddressController = AddressController;
AddressController.ADDRESSBUSINESS = new AddressBusiness_1.AddressBusiness(new AddressDatabase_1.AddressDatabase(), new IdGenerate_1.IdGenerate(), new Authenticator_1.Authenticator());

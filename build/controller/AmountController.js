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
exports.AmountController = void 0;
const AmountBusiness_1 = require("../business/AmountBusiness");
const AmountDatabase_1 = require("../database/AmountDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerate_1 = require("../services/IdGenerate");
class AmountController {
    insertAmount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AmountController.AMOUNTBUSINESS.insertAmount({
                    token: req.headers.authorization,
                    value: req.body.value,
                    nextendpoint: req.body.nextendpoint
                });
                res.status(200).send({
                    message: "Insert Amount"
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
exports.AmountController = AmountController;
AmountController.AMOUNTBUSINESS = new AmountBusiness_1.AmountBusiness(new AmountDatabase_1.AmountDatabase(), new IdGenerate_1.IdGenerate(), new Authenticator_1.Authenticator());

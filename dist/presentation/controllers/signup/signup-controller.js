"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class SignUpController {
    constructor(addAccount, validation) {
        this.addAccount = addAccount;
        this.validation = validation;
    }
    async handle(httpRequest) {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return (0, http_helper_1.badRequest)(error);
            }
            const { name, email, password, cpf, rg, birthdate, phoneNumber, } = httpRequest.body;
            const account = await this.addAccount.add({
                name,
                email,
                password,
                cpf,
                rg,
                birthdate,
                phoneNumber,
            });
            return (0, http_helper_1.ok)(account);
        }
        catch (error) {
            return (0, http_helper_1.serverError)(error);
        }
    }
}
exports.SignUpController = SignUpController;

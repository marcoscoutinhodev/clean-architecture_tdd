"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberValidatorAdapter = void 0;
class PhoneNumberValidatorAdapter {
    isValid(phoneNumber) {
        return /^\d{2}-\d{5}-\d{4}$/g.test(phoneNumber);
    }
}
exports.PhoneNumberValidatorAdapter = PhoneNumberValidatorAdapter;

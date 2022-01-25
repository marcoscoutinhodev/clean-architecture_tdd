"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpfValidatorAdapter = void 0;
class CpfValidatorAdapter {
    isValid(cpf) {
        const formatedCpf = cpf.replace(/[^0-9]+/g, '');
        if (formatedCpf.length !== 11)
            return false;
        let result = (this.verifyCpf(10, formatedCpf));
        if (parseInt(formatedCpf[9], 9) !== result)
            return false;
        result = (this.verifyCpf(11, formatedCpf));
        if (parseInt(formatedCpf[10], 10) !== result)
            return false;
        return true;
    }
    verifyCpf(count, formatedCpf) {
        let total = 0;
        let counter = count;
        for (let i = 0; i < count - 1; i++) {
            total += parseInt(formatedCpf[i], 10) * counter;
            counter--;
        }
        let result = (total * 10) % 11;
        if (result === 10 || result === 11)
            result = 0;
        return result;
    }
}
exports.CpfValidatorAdapter = CpfValidatorAdapter;

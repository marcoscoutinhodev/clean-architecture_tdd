import { CpfValidator } from '../presentation/protocols/cpf-validator';

export class CpfValidatorAdapter implements CpfValidator {
  isValid(cpf: string): boolean {
    const formatedCpf: string = cpf.replace(/[^0-9]+/g, '');
    // /^[0-9]{11}$/g
    if (formatedCpf.length !== 11) {
      return false;
    }

    let count: number = 10;
    let result: number = 0;

    for (let i = 0; i < 9; i++) {
      result += parseInt(formatedCpf[i], 10) * count;

      count--;
    }

    let remainder = (result * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (parseInt(formatedCpf[9], 10) !== remainder) {
      return false;
    }

    result = 0;
    count = 11;

    for (let i = 0; i < 10; i++) {
      result += parseInt(formatedCpf[i], 10) * count;

      count--;
    }

    remainder = (result * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (parseInt(formatedCpf[10], 10) !== remainder) {
      return false;
    }

    return true;
  }
}

import { CpfValidator } from '@/validation/protocols/cpf-validator';

export class CpfValidatorAdapter implements CpfValidator {
  isValid(cpf: string): boolean {
    const formatedCpf: string = cpf.replace(/[^0-9]+/g, '');

    if (formatedCpf.length !== 11) return false;

    let result: number = (this.verifyCpf(10, formatedCpf));

    if (parseInt(formatedCpf[9], 9) !== result) return false;

    result = (this.verifyCpf(11, formatedCpf));

    if (parseInt(formatedCpf[10], 10) !== result) return false;

    return true;
  }

  private verifyCpf(count: number, formatedCpf: string): number {
    let total: number = 0;
    let counter = count;

    for (let i = 0; i < count - 1; i++) {
      total += parseInt(formatedCpf[i], 10) * counter;

      counter--;
    }

    let result: number = (total * 10) % 11;

    if (result === 10 || result === 11) result = 0;

    return result;
  }
}

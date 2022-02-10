import { CpfValidator } from '@/validation/protocols/cpf-validator';

export const mockCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    isValid(cpf: string): boolean {
      return true;
    }
  }

  return new CpfValidatorStub();
};

import { Validation } from './validation';
import { CpfValidator } from '../../protocols/cpf-validator';
import { InvalidParamError } from '../../errors';

export class CpfValidation implements Validation {
  private readonly fieldName: string;
  private readonly cpfValidator: CpfValidator;

  constructor(fieldName: string, cpfValidator: CpfValidator) {
    this.fieldName = fieldName;
    this.cpfValidator = cpfValidator;
  }

  validate(input: any): Error | null {
    const isValid = this.cpfValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError('cpf');
    }

    return null;
  }
}

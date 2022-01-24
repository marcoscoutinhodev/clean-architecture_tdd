import { Validation } from '../../protocols/validation';
import { CpfValidator } from '../../protocols/cpf-validator';
import { InvalidParamError } from '../../errors';

export class CpfValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator,
  ) {}

  validate(input: any): Error | null {
    const isValid = this.cpfValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError('cpf');
    }

    return null;
  }
}

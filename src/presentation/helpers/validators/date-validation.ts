import { InvalidParamError } from '../../errors';
import { DateValidator } from '../../protocols/date-validator';
import { Validation } from '../../protocols/validation';

export class DateValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator,
  ) {}

  validate(input: any): Error | null {
    const isValid = this.dateValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError('date');
    }

    return null;
  }
}

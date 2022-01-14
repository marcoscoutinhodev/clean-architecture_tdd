import { InvalidParamError } from '../../errors';
import { DateValidator } from '../../protocols/date-validator';
import { Validation } from '../../protocols/validation';

export class DateValidation implements Validation {
  private readonly fieldName: string;
  private readonly dateValidator: DateValidator;

  constructor(fieldName: string, dateValidator: DateValidator) {
    this.fieldName = fieldName;
    this.dateValidator = dateValidator;
  }

  validate(input: any): Error | null {
    const isValid = this.dateValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError('date');
    }

    return null;
  }
}

import { Validation } from './validation';
import { PhoneNumberValidator } from '../../protocols/phone-number-validator';
import { InvalidParamError } from '../../errors';

export class PhoneNumberValidation implements Validation {
  private readonly fieldName: string;
  private readonly phoneNumberValidator: PhoneNumberValidator;

  constructor(fieldName: string, phoneNumberValidator: PhoneNumberValidator) {
    this.fieldName = fieldName;
    this.phoneNumberValidator = phoneNumberValidator;
  }

  validate(input: any): Error | null {
    const isPhoneNumberValid = this.phoneNumberValidator.isValid(input[this.fieldName]);

    if (!isPhoneNumberValid) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}

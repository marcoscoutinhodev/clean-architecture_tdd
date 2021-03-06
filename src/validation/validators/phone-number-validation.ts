import { PhoneNumberValidator } from '@/validation/protocols/phone-number-validator';
import { Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class PhoneNumberValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly phoneNumberValidator: PhoneNumberValidator,
  ) {}

  validate(input: any): Error | null {
    const isPhoneNumberValid = this.phoneNumberValidator.isValid(input[this.fieldName]);

    if (!isPhoneNumberValid) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}

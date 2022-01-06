import { PhoneNumberValidator } from '../presentation/protocols/phone-number-validator';

export class PhoneNumberValidatorAdapter implements PhoneNumberValidator {
  isValid(phoneNumber: string): boolean {
    return /^\+55-\d{2}-\d{5}-\d{4}$/g.test(phoneNumber);
  }
}

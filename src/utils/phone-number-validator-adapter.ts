import { PhoneNumberValidator } from '../presentation/protocols/phone-number-validator';

export class PhoneNumberValidatorAdapter implements PhoneNumberValidator {
  isValid(phoneNumber: string): boolean {
    return false;
  }
}

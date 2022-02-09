import { PhoneNumberValidator } from '@/validation/protocols/phone-number-validator';

export const mockPhoneNumberValidator = (): PhoneNumberValidator => {
  class PhoneNumberValidationStub implements PhoneNumberValidator {
    isValid(phoneNumber: string): boolean {
      return true;
    }
  }

  return new PhoneNumberValidationStub();
};

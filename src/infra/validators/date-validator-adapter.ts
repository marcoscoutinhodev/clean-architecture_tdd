import validator from 'validator';
import { DateValidator } from '@/validation/protocols/date-validator';

export class DateValidatorAdapter implements DateValidator {
  isValid(date: string): boolean {
    return validator.isDate(date);
  }
}

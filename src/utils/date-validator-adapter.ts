import validator from 'validator';
import { DateValidator } from '../presentation/protocols/date-validator';

export class DateValidatorAdapter implements DateValidator {
  isValid(date: string): boolean {
    return validator.isDate(date);
  }
}
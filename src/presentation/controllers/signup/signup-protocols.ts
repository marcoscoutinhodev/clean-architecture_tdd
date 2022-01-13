import { AddAccount } from '../../../domain/usecases/add-account';
import { DateValidator } from '../../protocols/date-validator';
import { PhoneNumberValidator } from '../../protocols/phone-number-validator';
import { Validation } from '../../helpers/validators/validation';

export * from '../../protocols';
export * from '../../protocols/email-validator';
export * from '../../protocols/cpf-validator';
export * from '../../protocols/date-validator';
export * from '../../protocols/phone-number-validator';
export * from '../../helpers/validators/validation';
export * from '../../../domain/usecases/add-account';
export * from '../../../domain/models/account';

export interface Dependencies {
  dateValidator: DateValidator
  phoneNumberValidator: PhoneNumberValidator
  addAccount: AddAccount
  validation: Validation
}

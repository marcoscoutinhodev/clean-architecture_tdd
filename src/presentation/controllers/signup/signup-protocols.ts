import { AddAccount } from '../../../domain/usecases/add-account';
import { PhoneNumberValidator } from '../../protocols/phone-number-validator';
import { Validation } from '../../helpers/validators/validation';

export * from '../../protocols';
export * from '../../protocols/phone-number-validator';
export * from '../../helpers/validators/validation';
export * from '../../../domain/usecases/add-account';
export * from '../../../domain/models/account';

export interface Dependencies {
  phoneNumberValidator: PhoneNumberValidator
  addAccount: AddAccount
  validation: Validation
}

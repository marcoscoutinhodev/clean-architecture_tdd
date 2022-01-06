import { AddAccount } from '../../../domain/usecases/add-account';
import { CpfValidator } from '../../protocols/cpf-validator';
import { DateValidator } from '../../protocols/date-validator';
import { EmailValidator } from '../../protocols/email-validator';
import { PhoneNumberValidator } from '../../protocols/phone-number-validator';

export * from '../../protocols';
export * from '../../protocols/email-validator';
export * from '../../protocols/cpf-validator';
export * from '../../protocols/date-validator';
export * from '../../protocols/phone-number-validator';
export * from '../../../domain/usecases/add-account';
export * from '../../../domain/models/account';

export interface Dependencies {
  emailValidator: EmailValidator,
  cpfValidator: CpfValidator,
  dateValidator: DateValidator,
  phoneNumberValidator: PhoneNumberValidator,
  addAccount: AddAccount
}

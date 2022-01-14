import { AddAccount } from '../../../domain/usecases/add-account';
import { Validation } from '../../helpers/validators/validation';

export * from '../../protocols';
export * from '../../helpers/validators/validation';
export * from '../../../domain/usecases/add-account';
export * from '../../../domain/models/account';

export interface Dependencies {
  addAccount: AddAccount
  validation: Validation
}

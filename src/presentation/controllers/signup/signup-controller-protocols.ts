import { AddAccount } from '../../../domain/usecases/add-account';
import { Validation } from '../../protocols/validation';

export * from '../../protocols';
export * from '../../protocols/validation';
export * from '../../../domain/usecases/add-account';
export * from '../../../domain/models/account';

export interface Dependencies {
  addAccount: AddAccount
  validation: Validation
}

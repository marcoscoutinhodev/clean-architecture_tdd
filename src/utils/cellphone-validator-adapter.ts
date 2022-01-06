import { CellphoneValidator } from '../presentation/protocols/cellphone-validator';

export class CellphoneValidatorAdapter implements CellphoneValidator {
  isValid(cellphone: string): boolean {
    return false;
  }
}

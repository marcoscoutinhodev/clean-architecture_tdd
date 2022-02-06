import { AccountModel } from '@/domain/models/account';

export type AddAccountModel = {
  name: string
  email: string
  password: string
  cpf: string
  rg: string
  birthdate: string
  phoneNumber: string
};

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel | null>
}

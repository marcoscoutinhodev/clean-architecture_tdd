import { AccountModel } from '../models/account';

export interface AddAccountModel {
  name: string
  email: string
  password: string
  cpf: string
  rg: string
  birthdate: string
  phoneNumber: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel | null>
}

import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const hash = (password) => hashSync(password, genSaltSync(11))
export const PassValidation = (passSent, passDB) => compareSync(passSent, passDB)
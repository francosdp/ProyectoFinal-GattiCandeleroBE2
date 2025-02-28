import 'dotenv/config'
import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const hash = (password) => hashSync(password, genSaltSync(parseInt(process.env.SALT)))
export const PassValidation = (passSent, passDB) => compareSync(passSent, passDB)
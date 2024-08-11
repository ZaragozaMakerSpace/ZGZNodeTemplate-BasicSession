import crypto from 'node:crypto'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // validar username (pasar a zod)

    Validation.username(username)
    Validation.password(password)

    // Asegurarse qie el usuario no existe...
    const user = User.findOne({ username })
    if (user) throw new Error('username already exist')

    const id = crypto.randomUUID()

    // const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })

    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    // quitar propiedad password al objeto...
    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Pasword must be at least 6 characters long')
  }
}

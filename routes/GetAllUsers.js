import fs from 'fs'
import { readDatabase } from "../helpers/fsDatabase.js"

const GetAllUsers = (ctx) => {
  const usersDatabase = readDatabase('users')
  ctx.body = usersDatabase
}

export default GetAllUsers

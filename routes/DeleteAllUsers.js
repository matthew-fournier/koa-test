import fs from 'fs'
import { writeDatabase } from "../helpers/fsDatabase.js"

const DeleteAllUsers = (ctx) => {
  writeDatabase('users', [])
  ctx.body = 'All users have been deleted'
}

export default DeleteAllUsers

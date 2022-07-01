import fs from 'fs'
import { readDatabase, writeDatabase } from "../helpers/fsDatabase.js"

const PostUserById = (ctx) => {
  const usersDatabase = readDatabase('users')
  const userLookupID = Number(ctx.params.userID)
  const userToUpdate = usersDatabase.find(user => user.id === userLookupID)

  if (typeof userToUpdate === 'undefined') {
    throw Error(`No user found with id ${userLookupID}`)
  }

  Object.keys(ctx.request.body).forEach((key) => {
    const validKeys = ['name', 'email', 'phone', 'birthday']
    if (!validKeys.includes(key)) { return }
    userToUpdate[key] = ctx.request.body[key]
  })

  writeDatabase('users', usersDatabase)

  ctx.body = userToUpdate
}

export default PostUserById

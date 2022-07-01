import fs from 'fs'
import { readDatabase, writeDatabase } from "../helpers/fsDatabase.js"

const DeleteUserById = (ctx) => {
  const usersDatabase = readDatabase('users')
  const userLookupID = Number(ctx.params.userID)

  const userToDeleteIndex = usersDatabase.findIndex(user => user.id === userLookupID)

  if (userToDeleteIndex === -1) {
    throw Error(`No user found with id ${userLookupID}`)
  }

  const userToDelete = usersDatabase[userToDeleteIndex]
  usersDatabase.splice(userToDeleteIndex, 1)

  writeDatabase('users', usersDatabase)

  ctx.body = userToDelete
}

export default DeleteUserById

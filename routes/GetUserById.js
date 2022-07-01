import fs from 'fs'
import { readDatabase, writeDatabase } from "../helpers/fsDatabase.js"

const GetUserById = (ctx) => {
    const usersDatabase = readDatabase('users')
    const userLookupID = Number(ctx.params.userID)
    const matchedUser = usersDatabase.find(user => user.id === userLookupID)

    if (typeof matchedUser === 'undefined') {
      throw Error(`No user found with id ${userLookupID}`)
    }

    ctx.body = matchedUser
}

export default GetUserById

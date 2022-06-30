import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const GetUserById = async (ctx) => {
  try {
    const usersDatabase = JSON.parse(fs.readFileSync('./database/users.json'))
    const userLookupID = Number(ctx.params.userID)
    const matchedUser = usersDatabase.find(user => user.id === userLookupID)

    if (typeof matchedUser === 'undefined') {
      throw Error(`No user found with id ${userLookupID}`)
    }

    ctx.body = matchedUser
  } catch(err) {
    errorResponse(ctx, err)
  }
}

export default GetUserById

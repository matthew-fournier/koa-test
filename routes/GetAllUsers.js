import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const GetAllUsers = async (ctx) => {
  try {
    const usersDatabase = JSON.parse(fs.readFileSync('./database/users.json'))
    ctx.body = usersDatabase
  } catch(err) {
    errorResponse(ctx, err)
  }
}

export default GetAllUsers

import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const DeleteAllUsers = async (ctx) => {
  try {
    fs.writeFileSync('./database/users.json', '[]')
    ctx.body = 'All users have been deleted'
  } catch(err) {
    errorResponse(ctx, err)
  }
}

export default DeleteAllUsers

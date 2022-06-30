import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const PostUserById = async (ctx) => {
  try {
    const usersDatabase = JSON.parse(fs.readFileSync('./database/users.json'))
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

    fs.writeFileSync('./database/users.json', JSON.stringify(usersDatabase, null, 4))

    ctx.body = userToUpdate
  } catch(err) {
    console.log(err)
    errorResponse(ctx, err)
  }
}

export default PostUserById

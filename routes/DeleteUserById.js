import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const DeleteUserById = async (ctx) => {
  try {
    const usersDatabase = JSON.parse(fs.readFileSync('./database/users.json'))
    const userLookupID = Number(ctx.params.userID)

    const userToDeleteIndex = usersDatabase.findIndex(user => user.id === userLookupID)

    if (userToDeleteIndex === -1) {
      throw Error(`No user found with id ${userLookupID}`)
    }

    const userToDelete = usersDatabase[userToDeleteIndex]
    usersDatabase.splice(userToDeleteIndex, 1)

    fs.writeFileSync('./database/users.json', JSON.stringify(usersDatabase, null, 4))


    ctx.body = userToDelete
  } catch(err) {
    console.error(err)
    errorResponse(ctx, err)
  }
}

export default DeleteUserById

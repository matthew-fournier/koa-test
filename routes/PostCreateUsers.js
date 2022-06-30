import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const PostCreateUsers = async (ctx) => {
  try {
    const { numberOfUsers } = ctx.request.body

    if (typeof numberOfUsers === 'undefined' || !numberOfUsers) {
      throw Error('numberOfUsers is undefined or null')
    }

    if (parseInt(numberOfUsers, 10) > 15) {
      throw Error('numberOfUsers has a max value of 15')
    }

    const usersDatabase = JSON.parse(fs.readFileSync('./database/users.json'))
    const indexAdjust = usersDatabase.length === 0
      ? 0
      : usersDatabase[usersDatabase.length - 1].id + 1

    const newUsers = await Promise.allSettled(
      [...Array(parseInt(numberOfUsers, 10)).keys()]
        .map(async (user, index) => {
          return {
            id: index + indexAdjust,
            name:  `Name ${index + indexAdjust}`
          }
        })
    ).then((users) => {
      return users
        .filter(newUser => newUser.status === 'fulfilled')
        .map(newUser => newUser.value)
    })

    const updatedUsersDatabase = usersDatabase.concat(newUsers)
    fs.writeFileSync('./database/users.json', JSON.stringify(updatedUsersDatabase, null, 4))

    ctx.body = updatedUsersDatabase
  } catch(err) {
    errorResponse(ctx, err)
  }
}

export default PostCreateUsers

import { promises as fs } from 'fs'
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

    const newUsers = await Promise.allSettled(
      [...Array(parseInt(numberOfUsers, 10)).keys()]
        .map(async (user, index) => {
          return {
            id: index,
            name:  `Name ${index}`
          }
        })
    ).then((users) => {
      return users
        .filter(newUser => newUser.status === 'fulfilled')
        .map(newUser => newUser.value)
    })


    fs.writeFile('../database.json', JSON.stringify(newUsers))

    ctx.body = newUsers
  } catch(err) {
    errorResponse(ctx, err)
  }
}

export default PostCreateUsers

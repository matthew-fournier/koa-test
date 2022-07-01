import axios from 'axios'
import { readDatabase, writeDatabase } from "../helpers/fsDatabase.js"

const PostCreateUsers = async (ctx, next) => {
  const { numberOfUsers } = ctx.request.body
  if (
    typeof numberOfUsers === 'undefined' ||
    !numberOfUsers ||
    Number(numberOfUsers) > 15
    || Number(numberOfUsers) < 1
  ) {
    throw Error('numberOfUsers must be a number from 1 - 15')
  }

  const usersDatabase = readDatabase('users')
  const indexAdjust = usersDatabase.length === 0
    ? 0
    : usersDatabase[usersDatabase.length - 1].id + 1

  const newUsersResponse = await Promise.allSettled(
    [...Array(Number(numberOfUsers)).keys()]
      .map(async (user, index) => {
        const resRandomData = await axios.get('https://randomuser.me/api/')
        const randomData = resRandomData.data?.results[0]

        return {
          id: index + indexAdjust,
          name: `${randomData.name.first} ${randomData.name.last}`,
          email: randomData.email,
          phone: randomData.phone,
          birthday: randomData.dob.date
        }
      })
  )

  const newUsers = newUsersResponse
    .filter(newUser => newUser.status === 'fulfilled')
    .map(newUser => newUser.value)

  const updatedUsersDatabase = usersDatabase.concat(newUsers)
  writeDatabase('users', updatedUsersDatabase)

  ctx.body = newUsers
  await next()
}

export default PostCreateUsers

import Router from 'koa-router'
import createRandomUsers from '../helpers/createRandomUsers.js'
import { readDatabase, writeDatabase } from '../helpers/fsDatabase.js'

const router = new Router({ prefix: '/users' })

router.get('/', async (ctx, next) => {
  const usersDatabase = readDatabase('users')
  const { search } = ctx.query

  ctx.body = (typeof search === 'undefined' || search.length === 0)
    ? usersDatabase
    : usersDatabase.filter(user =>
      (
        user.name.indexOf(search) !== -1 ||
        user.email.indexOf(search) !== -1
      )
    )
})

router.post('/', async (ctx, next) => {
  const { numberOfUsers } = ctx.request.body
  if (
    typeof numberOfUsers === 'undefined' ||
    !numberOfUsers ||
    Number(numberOfUsers) > 3
    || Number(numberOfUsers) < 1
  ) {
    throw Error('numberOfUsers must be a number from 1 - 3')
  }

  const usersDatabase = readDatabase('users')
  const indexAdjust = usersDatabase.length === 0
    ? 0
    : usersDatabase[usersDatabase.length - 1].id + 1

  const newUsers = await createRandomUsers(numberOfUsers, indexAdjust)

  const updatedUsersDatabase = usersDatabase.concat(newUsers)
  writeDatabase('users', updatedUsersDatabase)

  ctx.body = newUsers
})

router.delete('/', (ctx, next) => {
  writeDatabase('users', [])
  ctx.body = 'All users have been deleted'
})

export default router

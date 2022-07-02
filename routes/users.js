import Router from 'koa-router'
import createRandomUsers from '../helpers/createRandomUsers.js'
import { readDatabase, writeDatabase } from '../helpers/fsDatabase.js'

const router = new Router({ prefix: '/users' })

router.get('/', async (ctx, next) => {
  const usersDatabase = readDatabase('users')
  ctx.body = usersDatabase
})

router.post('/', async (ctx, next) => {
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

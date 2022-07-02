import Router from 'koa-router'
import { readDatabase, writeDatabase } from '../helpers/fsDatabase.js'

const router = new Router({ prefix: '/user' })

router.get('/:userID', async (ctx, next) => {
  const usersDatabase = readDatabase('users')
  const userLookupID = Number(ctx.params.userID)
  const matchedUser = usersDatabase.find(user => user.id === userLookupID)

  if (typeof matchedUser === 'undefined') {
    throw Error(`No user found with id ${userLookupID}`)
  }

  ctx.body = matchedUser
})

router.post('/:userID', async (ctx, next) => {
  const usersDatabase = readDatabase('users')
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

  writeDatabase('users', usersDatabase)

  ctx.body = userToUpdate
})

router.delete('/:userID', (ctx, next) => {
  const usersDatabase = readDatabase('users')
  const userLookupID = Number(ctx.params.userID)

  const userToDeleteIndex = usersDatabase.findIndex(user => user.id === userLookupID)

  if (userToDeleteIndex === -1) {
    throw Error(`No user found with id ${userLookupID}`)
  }

  const userToDelete = usersDatabase[userToDeleteIndex]
  usersDatabase.splice(userToDeleteIndex, 1)

  writeDatabase('users', usersDatabase)

  ctx.body = userToDelete
})

export default router

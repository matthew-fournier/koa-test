import Router from 'koa-router'
import { readDatabase, writeDatabase } from '../helpers/fsDatabase.js'

const router = new Router({ prefix: '/user/:userID/friends' })

// router.get('/', async (ctx, next) => {
//   const usersDatabase = readDatabase('users')
//   const userLookupID = Number(ctx.params.userID)
//   const matchedUser = usersDatabase.find(user => user.id === userLookupID)

//   if (typeof matchedUser === 'undefined') {
//     throw Error(`No user found with id ${userLookupID}`)
//   }

//   ctx.body = matchedUser
// })

router.post('/', async (ctx, next) => {
  const { friendId } = ctx.request.body
  if (!friendId) { throw Error ('Missing friendId from body')}

  const usersDatabase = readDatabase('users')
  const friendsDatabase = readDatabase('friends')
  const userLookupID = Number(ctx.params.userID)

  const matchedUser = usersDatabase.find(user => user.id === userLookupID)
  if (typeof matchedUser === 'undefined') {
    throw Error(`No user found with id ${userLookupID}`)
  }

  const friendUser = usersDatabase.find(user => user.id === Number(friendId))
  if (typeof friendUser === 'undefined' || friendUser.id === matchedUser.id) {
    throw Error('friendId is invalid')
  }

  const relationshipCheck = friendsDatabase.find(relationship =>
    (relationship.userIdA === matchedUser.id && relationship.userIdB === friendUser.id) ||
    (relationship.userIdB === matchedUser.id && relationship.userIdA === friendUser.id)
  )

  if (typeof relationshipCheck !== 'undefined') {
    throw Error(`${matchedUser.name} & ${friendUser.name} are already friends`)
  }

  const newFriendship = {
    id: friendsDatabase.length === 0 ? 0 : friendsDatabase[friendsDatabase.length - 1].id + 1,
    userIdA: matchedUser.id,
    userIdB: friendUser.id
  }
  friendsDatabase.push(newFriendship)

  friendsDatabase.push()
  writeDatabase('friends', friendsDatabase)

  ctx.body = newFriendship
})

router.delete('/:friendshipID', (ctx, next) => {
  const friendsDatabase = readDatabase('friends')
  const userLookupID = Number(ctx.params.userID)
  const friendshipLookupID = Number(ctx.params.friendshipID)

  const friendshipToDeleteIndex = friendsDatabase.findIndex(friendship =>
    friendship.id === friendshipLookupID
  )

  if (friendshipToDeleteIndex === -1) {
    throw Error(`No friendship found with id ${friendshipLookupID}`)
  }

  const friendshipToDelete = friendsDatabase[friendshipToDeleteIndex]

  if (
    userLookupID !== friendshipToDelete.userIdA &&
    userLookupID !== friendshipToDelete.userIdB
  ) { throw Error(`User ID ${userLookupID} not part of this friendship`) }

  friendsDatabase.splice(friendshipToDeleteIndex, 1)
  writeDatabase('friends', friendsDatabase)

  ctx.body = friendshipToDelete
})

export default router

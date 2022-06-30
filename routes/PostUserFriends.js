import fs from 'fs'
import errorResponse from "../helpers/errorResponse.js"

const PostUserFriends = async (ctx) => {
  try {
    const { friendId } = ctx.request.body
    if (!friendId) { throw Error ('Missing friendId from body')}


    const usersDatabase = JSON.parse(fs.readFileSync('./database/users.json'))
    const friendsDatabase = JSON.parse(fs.readFileSync('./database/friends.json'))
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
    fs.writeFileSync('./database/friends.json', JSON.stringify(friendsDatabase, null, 4))

    ctx.body = newFriendship
  } catch(err) {
    console.log(err)
    errorResponse(ctx, err)
  }
}

export default PostUserFriends

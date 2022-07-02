import Router from 'koa-router'

const router = new Router({ prefix: '/' })

router.get('/', async (ctx, next) => {
  ctx.body = `
    <p>Run these routes with <a href="https://www.postman.com/" target="_blank">Postman</a></p>

    <h4>Root</h4>
    <ul>
      <li>GET / - Returns list of all routes</li>
    </ul>

    <h4>Users</h4>
    <ul>
      <li>GET /users - Returns list of all users</li>
      <li>
        POST /users - Creates 'numberOfUsers' of new users & Returns new users
        <br>Body Data
        <ul>
          <li>numberOfUsers: 1 - 3</li>
        </ul>
      </li>
      <li>DELETE /users - Deletes all users</li>
    </ul>

    <h4>User</h4>
    <ul>
      <li>GET /user/:userID - Returns user info by ID</li>
      <li>
        POST /user/:userID  - Updates user by ID
        <br>Body Data
        <ul>
          <li>name: string(optional)</li>
          <li>email: string(optional)</li>
          <li>phone: string(optional)</li>
          <li>birthday: string(optional)</li>
        </ul>
      </li>
      <li>DELETE /user/:userID  - Deletes user by ID</li>
    </ul>

    <h4>User Friend</h4>
    <ul>
      <li>GET /user/:userID/friends - Returns user's friends by user ID</li>
      <li>
        POST /user/:userID/friends  - Creates a new friendship
        <br>Body Data
        <ul>
          <li>friendId: id of another user</li>
        </ul>
      </li>
      <li>DELETE /user/:userID/friends/:friendshipID  - Deletes a user's friendship by friendship id</li>
    </ul>
  `
})

export default router

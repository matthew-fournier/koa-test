const GetRouteList = (ctx) => {
  ctx.body = `
    <p>Run these routes with <a href="https://www.postman.com/" target="_blank">Postman</a></p>

    <h3>GET</h3>
    <ul>
      <li><strong>/</strong> (Get list of all routes)</li>
      <li><strong>/allUsers</strong> (Get list of all users)</li>
      <li><strong>/user/:userID</strong> (Get user by id)</li>
    </ul>

    <h3>POST</h3>
    <ul>
      <li>
        <strong>/createUsers</strong> (Creates "numberOfUsers" users in database)
        <br>Response: List of new users
        <br><br>Body Data
        <ul>
          <li><strong>numberOfUsers:</strong> 1 - 15</li>
        </ul>
      </li>
      <li>
        <strong>/user/userID</strong> (Updates a user)
        <br>Response: Updated user
        <br><br>Body Data
        <ul>
          <li><strong>name:</strong> string(optional)</li>
          <li><strong>email:</strong> string(optional)</li>
          <li><strong>phone:</strong> string(optional)</li>
          <li><strong>birthday:</strong> string(optional)</li>
        </ul>
      </li>
    </ul>

    <h3>DELETE</h3>
    <ul>
      <li><strong>/allUsers</strong> (Delete all users)</li>
      <li>
        <strong>/user/:userID</strong> (Delete user by id)
        <br>Response: Deleted user
      </li>
    </ul>
  `
}

export default GetRouteList

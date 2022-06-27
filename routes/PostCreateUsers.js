const PostCreateUsers = (ctx) => {
  const { body } = ctx.request

  console.log(body)

  ctx.body = `
    <ul>
      <li><strong>/</strong> (Get list of all routes)</li>
      <li><strong>/buildUsers</strong> (Creates users in database)</li>
    </ul>

  `
}

export default PostCreateUsers

const GetRouteList = (ctx) => {
  ctx.body = `
    <ul>
      <li><strong>/</strong> (Get list of all routes)</li>
      <li><strong>/buildUsers</strong> (Creates users in database)</li>
    </ul>

  `
}

export default GetRouteList

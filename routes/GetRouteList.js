const GetRouteList = (ctx) => {
  ctx.body = `
    <p>Run these routes with <a href="https://www.postman.com/" target="_blank">Postman</a></p>
    <ul>
      <li><strong>GET - /</strong> (Get list of all routes)</li>
      <li><strong>POST - /buildUsers</strong> (Creates users in database)</li>
    </ul>

  `
}

export default GetRouteList

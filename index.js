import Koa from 'koa'
import Router from 'koa-router'
import GetRouteList from './routes/GetRouteList.js'

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => { GetRouteList(ctx) })
router.post('/', (ctx) => { PostCreateUsers(ctx) })

// router.get('/', (ctx) => {
//   ctx.body = 'hi'
// })

app
  .use(router.routes())
  .use(router.allowedMethods())

const port = 3000
app.listen(port)
console.log(`Server running on: http://localhost:${port}/`)

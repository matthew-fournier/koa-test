import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import GetRouteList from './routes/GetRouteList.js'
import PostCreateUsers from './routes/PostCreateUsers.js'

// Init Koa
const app = new Koa()
const router = new Router()
const koaBodyMiddleware = koaBody({ multipart: true })

app.use(router.routes())
app.use(router.allowedMethods())

// Routes

// const routeCaller = async (ctx, route) => {
//   try {
//     route(ctx)
//   } catch (err) {
    
//   }
// }


router.get('/', koaBodyMiddleware, (ctx) => { GetRouteList(ctx) })
router.post('/buildUsers', koaBodyMiddleware, (ctx) => { PostCreateUsers(ctx) })






// Run API Routes
const port = 3000
app.listen(port)
console.log(`Running on: http://localhost:${port}/`)

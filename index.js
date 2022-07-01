import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import errorResponse from './helpers/errorResponse.js'
import DeleteAllUsers from './routes/DeleteAllUsers.js'
import DeleteUserById from './routes/DeleteUserById.js'
import GetAllUsers from './routes/GetAllUsers.js'
import GetRouteList from './routes/GetRouteList.js'
import GetUserById from './routes/GetUserById.js'
import PostCreateUsers from './routes/PostCreateUsers.js'
import PostUserById from './routes/PostUserById.js'
import PostUserFriends from './routes/PostUserFriends.js'

// Init Koa
const app = new Koa()
const router = new Router()
const koaBodyMiddleware = koaBody({ multipart: true })



app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    errorResponse(ctx, err)
  }
});
app.use(koaBodyMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

// GET
router.get('/', koaBodyMiddleware, (ctx) => { GetRouteList(ctx) })
router.get('/users', koaBodyMiddleware, (ctx) => { GetAllUsers(ctx) })
router.get('/user/:userID', koaBodyMiddleware, (ctx) => { GetUserById(ctx) })
router.get('/user/:userID/friends', koaBodyMiddleware, (ctx) => { GetUserFriends(ctx) })

// POST
router.post('/users', async (ctx, next) => { PostCreateUsers(ctx) })
router.post('/user/:userID', koaBodyMiddleware, (ctx) => { PostUserById(ctx) })
router.post('/user/:userID/friends', koaBodyMiddleware, (ctx) => { PostUserFriends(ctx) })

// DELETE
router.delete('/users', koaBodyMiddleware, (ctx) => { DeleteAllUsers(ctx) })
router.delete('/user/:userID', koaBodyMiddleware, (ctx) => { DeleteUserById(ctx) })

// Run API Routes
const port = 3000
app.listen(port)
console.log(`Running on: http://localhost:${port}/`)

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

// Init Middleware
app.use(async (ctx, next) => {
  try { await next() }
  catch (err) {errorResponse(ctx, err) }
})
app.use(koaBody({ multipart: true }))
app.use(router.routes())
app.use(router.allowedMethods())

// GET
router.get('/', (ctx, next) => { GetRouteList(ctx) })
router.get('/users', (ctx, next) => { GetAllUsers(ctx) })
router.get('/user/:userID', (ctx, next) => { GetUserById(ctx) })
router.get('/user/:userID/friends', (ctx, next) => { GetUserFriends(ctx) })

// POST
router.post('/users', async (ctx, next) => { PostCreateUsers(ctx, next) })
router.post('/user/:userID', (ctx, next) => { PostUserById(ctx) })
router.post('/user/:userID/friends', (ctx, next) => { PostUserFriends(ctx) })

// DELETE
router.delete('/users', (ctx, next) => { DeleteAllUsers(ctx) })
router.delete('/user/:userID', (ctx, next) => { DeleteUserById(ctx) })

// Run API Routes
const port = 3000
app.listen(port)
console.log(`Running on: http://localhost:${port}/`)

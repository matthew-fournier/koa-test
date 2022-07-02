import axios from 'axios'
import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import errorResponse from './helpers/errorResponse.js'
import rootRouter from './routes/root.js'
import usersRouter from './routes/users.js'
import userRouter from './routes/user.js'
import userFriendsRouter from './routes/userFriends.js'

// Init Koa
const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  try { await next() }
  catch (err) {errorResponse(ctx, err) }
})
app.use(koaBody({ multipart: true }))
app.use(router.allowedMethods())

// Set Routes
const routes = [
  rootRouter,
  usersRouter,
  userRouter,
  userFriendsRouter
]
routes.forEach(route => {
  app.use(route.routes())
})

// Run App
const port = 3000
app.listen(port)
console.log(`Running on: http://localhost:${port}/`)

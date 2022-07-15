import { Pool, Client } from 'pg'
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


const credentials = {
  user: "postgres",
  host: "localhost",
  database: "Test",
  password: "Deadpool1992",
  port: 5432,
};

const client = new Client(credentials)
client.connect()


client.query('SELECT name FROM teams', (err, res) => {
  console.log(res.rows)
})


const text = 'INSERT INTO teams(name) VALUES($1) RETURNING *'
const values = ['brianec']
client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})


// pool.query('INSERT INTO teams(name) VALUES ($hotdog)', ['hotdog'],  function(err, res) {
//   if(err) {
//       return console.error('error running query', err);
//   }
//   console.log(res);
// });



// Run App
const port = 3030
app.listen(port)
console.log(`Running on: http://localhost:${port}/`)

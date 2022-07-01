const errorResponse = (ctx, err) => {
  console.error(ctx.body)
  ctx.status = err.statusCode || err.status || 500;
  ctx.body = { message: err.message || 'An Error Has Occured' }
}

export default errorResponse
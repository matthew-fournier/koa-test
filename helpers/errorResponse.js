const errorResponse = (ctx, err) => {
  ctx.status = err.statusCode || err.status || 500;
  ctx.body = { message: err.message || 'An Error Has Occured' }
  console.error(ctx.body)
}

export default errorResponse
import { ZodError } from 'zod'

type Obj = {
  [key: string]: string
}

export function zodErrorHandler(error: ZodError) {
  const err = JSON.parse(error.message)
  const parsedError: Obj = {}

  err.forEach((item: Obj) => {
    parsedError[item.path] = item.message
  })

  return parsedError
}

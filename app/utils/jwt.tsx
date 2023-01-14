import jwt from 'jsonwebtoken'

export function createToken (data: any): string {
  const secret = process.env.SECRET || 'secret'

  return jwt.sign({ data }, secret, { expiresIn: '1h' })
}

export function decodeToken (token: string) {
  const secret = process.env.SECRET || 'secret'
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return {
        name: 'JWTError',
        message: `ERROR: ${err.message}`
      }
    }
    return decoded
  })
}

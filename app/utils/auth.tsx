import type { User } from '@prisma/client'
import { decodeToken } from './jwt'
import { getSession } from './session'

export async function isLogin (request: { headers: { get: (arg0: string) => string | null | undefined } }) {
  const session = await getSession(
    request.headers.get('Cookie')
  )
  const res: any = decodeToken(session.get('token'))
  const user: User = res.data
}

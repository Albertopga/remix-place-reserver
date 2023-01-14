// import { redirect } from '@remix-run/node'
// import { useLoaderData } from '@remix-run/react'
// import { UserService } from '~/services/user'
// import { getSession, commitSession } from '../session'

// export const loader = async ({ params, request }: any) => {
//   const _user = new UserService()
//   const user = await _user.getUserById(params.userId)

//   const session = await getSession(
//     request.headers.get('Cookie')
//   )
//   console.log('asd', session.get('token'))
//   return { user }
// }
// export async function action ({ request }: any) {

// }
// export default function SinglePost () {
//   const { user } = useLoaderData()
//   return (
//     <>
//       <h2>Hola {user.name}</h2>

//     </>
//   )
// }
